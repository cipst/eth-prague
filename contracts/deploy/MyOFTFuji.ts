import assert from "assert";

import { type DeployFunction } from "hardhat-deploy/types";

const contractName = "MyOFT";

const deploy: DeployFunction = async (hre) => {
	const { getNamedAccounts, deployments } = hre;

	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	assert(deployer, "Missing named deployer account");

	console.log(`Network: ${hre.network.name}`);
	console.log(`Deployer: ${deployer}`);

	// This is an external deployment pulled in from @layerzerolabs/lz-evm-sdk-v2
	//
	// @layerzerolabs/toolbox-hardhat takes care of plugging in the external deployments
	// from @layerzerolabs packages based on the configuration in your hardhat config
	//
	// For this to work correctly, your network config must define an eid property
	// set to `EndpointId` as defined in @layerzerolabs/lz-definitions
	//
	// For example:
	//
	// networks: {
	//   fuji: {
	//     ...
	//     eid: EndpointId.AVALANCHE_V2_TESTNET
	//   }
	// }
	const endpointV2Deployment = await hre.deployments.get("EndpointV2");
	const fujiLzEndpoint = "0xcb566e3B6934Fa77258d68ea18E931fa75e1aaAa"; // FLOW MAINNET LayerZero V2 Endpoint

	const { address } = await deploy(contractName, {
		from: deployer,
		args: [
			"MyOFT", // name
			"MOFT", // symbol
			fujiLzEndpoint, // LayerZero's EndpointV2 address
			deployer, // owner
		],
		log: true,
		skipIfAlreadyDeployed: false,
	});

	console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`);
};

deploy.tags = [contractName];

export default deploy;
