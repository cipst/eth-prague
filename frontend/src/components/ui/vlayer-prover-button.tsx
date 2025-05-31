import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useVlayer } from "@/hooks/use-vlayer";


export const VlayerButton = ({ className }: { className?: string }) => {
    
  const { address } = useAccount();
  const [disabled, setDisabled] = useState(false);

  const {
    requestWebProof,
    webProof,
    callProver,
    isPending,
    isCallProverIdle,
    result,
    error,
    handleMint
  } = useVlayer();

  useEffect(() => {
    console.log('web proof ', webProof, 'isCallProverIdle ', isCallProverIdle);
    // Automatically call the prover if webProof is available and the prover is idle
    // This is useful for testing purposes, but you might want to remove it in production
    try{
    if (webProof && isCallProverIdle) {
        console.log("Calling prover with webProof and address:", webProof, address);
      callProver([webProof, address]);
    }
}catch (e) {
    console.error("Error calling prover:", e);
    }
  }, [webProof, address, callProver, isCallProverIdle]);

  useEffect(() => {
    console.log("Proving result:", result);
  }, [result]);

 

  useEffect(() => {
    if (error) {
    //   throw error;
    }
  }, [error]);

    return (
       <div className={`flex justify-center flex-col items-center${className ? ` ${className}` : ""}`}>
        <button
          disabled={disabled}
          id="nextButton"
          onClick={() => {
            requestWebProof();
            setDisabled(true);
          }}
        >
          {isPending ? "Proving in progress..." : "Update CEX balance"}
        </button>
         {webProof && (
            <button
                className="mt-4"
                onClick={() => handleMint()}
            >
                Mint
            </button>
        )}
      </div>
    );
};
