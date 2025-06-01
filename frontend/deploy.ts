import proverSpec from "../vlayerContracts/out/WebProofProver.sol/WebProofProver";
import verifierSpec from "../vlayerContracts/out/WebProofVerifier.sol/WebProofVerifier";
import {
  deployVlayerContracts,
  writeEnvVariables,
  getConfig,
} from "@vlayer/sdk/config";

const config = getConfig();

// const { prover, verifier } = await deployVlayerContracts({
//   proverSpec,
//   verifierSpec,
//   config:{
//   gasLimit:  10000000000, // <-- add this line
//   }
  
// });

await writeEnvVariables(".env", {
  VITE_PROVER_ADDRESS: '0x8237a9151b1D57a98b12B15878Ea0569D7D95987',
  VITE_VERIFIER_ADDRESS: '0xDAbAFb9134d744fda5e8afB847e9F96788ca3EBf',
  VITE_CHAIN_NAME: config.chainName,
  VITE_PROVER_URL: config.proverUrl,
  VITE_JSON_RPC_URL: config.jsonRpcUrl,
  VITE_CLIENT_AUTH_MODE: config.clientAuthMode,
  VITE_PRIVATE_KEY: config.privateKey,
  VITE_VLAYER_API_TOKEN: config.token,
  VITE_NOTARY_URL: config.notaryUrl,
  VITE_WS_PROXY_URL: config.wsProxyUrl,
  VITE_GAS_LIMIT: config.gasLimit,
});
