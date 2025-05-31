
import { useEffect, useState } from "react";
import {
  useCallProver,
  useWaitForProvingResult,
  useWebProof,
  useChain,
} from "@vlayer/react";
import { useLocalStorage } from "usehooks-ts";
import type { WebProofConfig, ProveArgs } from "@vlayer/sdk";
import type { Abi, ContractFunctionName } from "viem";
import { startPage, expectUrl, notarize } from "@vlayer/sdk/web_proof";
import { UseChainError, WebProofError } from "@/utils/errors";
import webProofProver from "../../../vlayerContracts/out/WebProofProver.sol/WebProofProver";
import WebProofVerifier from "../../../vlayerContracts/out/WebProofVerifier.sol/WebProofVerifier";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";


const webProofConfig: WebProofConfig<Abi, string> = {
  proverCallCommitment: {
    address: "0x0000000000000000000000000000000000000000",
    proverAbi: [],
    functionName: "proveWeb",
    commitmentArgs: [],
    chainId: 1,
  },
  logoUrl: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=029", 
  steps: [
    startPage("https://binance.com", "Go to binance.com login page"),
    expectUrl("https://www.binance.com/it/my/dashboard", "Go to Dahsboard"),
    notarize(
      "https://www.binance.com/bapi/asset/v2/private/asset-service/wallet/balance?quoteAsset=BTC&needBalanceDetail=true&needEuFuture=true",
      "GET",
      "Generate Proof of Balance of Binance",
      [
        {
          request: {
            // redact all the headers
            headers_except: [],
          },
        },
        {
          response: {
            // response from api.x.com sometimes comes with Transfer-Encoding: Chunked
            // which needs to be recognised by Prover and cannot be redacted
            headers_except: ["Transfer-Encoding"],
          },
        },
      ],
    ),
  ],
};

export const useVlayer = () => {
  const [error, setError] = useState<Error | null>(null);

  const {
    requestWebProof,
    webProof,
    isPending: isWebProofPending,
    error: webProofError,
  } = useWebProof(webProofConfig);

  if (webProofError) {
    console.error("WebProof Error:", webProofError);
    // throw new WebProofError(webProofError.message);
  }

  const { chain, error: chainError } = useChain(
    import.meta.env.VITE_CHAIN_NAME,
  );
  useEffect(() => {
    if (chainError) {
      setError(new UseChainError(chainError));
    }
  }, [chainError]);

  const vlayerProverConfig: Omit<
    ProveArgs<Abi, ContractFunctionName<Abi>>,
    "args"
  > = {
    address: import.meta.env.VITE_PROVER_ADDRESS as `0x${string}`,
    proverAbi: webProofProver.abi,
    chainId: chain?.id,
    functionName: "main",
    gasLimit: Number(import.meta.env.VITE_GAS_LIMIT),
  };

  const {
    callProver,
    isPending: isCallProverPending,
    isIdle: isCallProverIdle,
    data: hash,
    error: callProverError,
  } = useCallProver(vlayerProverConfig);

  if (callProverError) {
    // throw callProverError;
  }

  const {
    isPending: isWaitingForProvingResult,
    data: result,
    error: waitForProvingResultError,
  } = useWaitForProvingResult(hash);

  if (waitForProvingResultError) {
    throw waitForProvingResultError;
  }

  const [, setWebProof] = useLocalStorage("webProof", "");
  const [, setProverResult] = useLocalStorage("proverResult", "");

  useEffect(() => {
    if (webProof) {
      console.log("webProof", webProof);
      setWebProof(JSON.stringify(webProof));
    }
  }, [JSON.stringify(webProof)]);

  useEffect(() => {
    if (result) {
      console.log("proverResult", result);
      setProverResult(JSON.stringify(result));
    }
  }, [JSON.stringify(result)]);

  const [mintedHandle, setMintedHandle] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  // Using mintingError state to throw error in useEffect because ErrorBoundary does not catch errors from async functions like handleMint
  // const [mintingError, setMintingError] = useState<Error | null>(null);
  const [proverResult] = useLocalStorage("proverResult", "");
  // const { address } = useAccount();
  // const { data: balance } = useBalance({ address });
  const { writeContract, data: txHash, error: writeContractError } = useWriteContract();
  const { status } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (proverResult) {
      const result = JSON.parse(proverResult) as Parameters<
        typeof writeContract
      >[0]["args"];
      if (!result || !Array.isArray(result) || typeof result[1] !== "string") {
        throw new Error(
          "Serialized prover result from local storage is invalid",
        );
      }
      setMintedHandle(result[1]);
    }
  }, [proverResult]);

  const handleMint = async () => {
    setIsMinting(true);
    if (!proverResult) {
      return;
    }

    const proofData = JSON.parse(proverResult) as Parameters<
      typeof writeContract
    >[0]["args"];
    console.log("proofData", proofData);
    const writeContractArgs: Parameters<typeof writeContract>[0] = {
      address: import.meta.env.VITE_VERIFIER_ADDRESS as `0x${string}`,
      abi: WebProofVerifier.abi,
      functionName: "verify",
      args: proofData,
    };

    writeContract(writeContractArgs);
  };

  return {
    requestWebProof,
    webProof,
    isPending:
      isWebProofPending || isCallProverPending || isWaitingForProvingResult,
    isCallProverIdle,
    isWaitingForProvingResult,
    isWebProofPending,
    callProver,
    result,
    error: writeContractError,
    handleMint,
    isMinting,
    mintedHandle,
    setMintedHandle,
    status
  };
};

export const useBalance = (address: `0x${string}`, refetchTrigger?: any) => {
  const contract = useReadContract({
    address: import.meta.env.VITE_VERIFIER_ADDRESS as `0x${string}`,
    abi: WebProofVerifier.abi,
    functionName: "balances",
    args: [address],
  });

  // Refetch when refetchTrigger changes
  useEffect(() => {
    if (contract.refetch) contract.refetch();
  }, [refetchTrigger]);
  return contract;
};
export const useBalanceCreatedAt = (address: `0x${string}`, refetchTrigger?: any) => {
  const contract = useReadContract({
    address: import.meta.env.VITE_VERIFIER_ADDRESS as `0x${string}`,
    abi: WebProofVerifier.abi,
    functionName: "balanceCreatedAt",
    args: [address],
  });

  // Refetch when refetchTrigger changes
  useEffect(() => {
    if (contract.refetch) contract.refetch();
  }, [refetchTrigger]);
  return contract;
};