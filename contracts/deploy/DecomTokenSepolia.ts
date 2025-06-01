import assert from "assert";

import { type DeployFunction } from "hardhat-deploy/types";

const contractName = "DecomToken";

const deploy: DeployFunction = async (hre) => {
	const { getNamedAccounts, deployments } = hre;

	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	assert(deployer, "Missing named deployer account");

	console.log(`Network: ${hre.network.name}`);
	console.log(`Deployer: ${deployer}`);

	const sepoliaLzEndpoint = "0x1a44076050125825900e736c501f859c50fE728c"; // ETHEREUM MAINNET LayerZero V2 ENDPOINT
	const assetInSepoliaAddress = "0xAf1fB6B242b42c9406Cf9f039400B8a1C06185F4"; // Address MyToken

	const { address } = await deploy(contractName, {
		from: deployer,
		args: [
			sepoliaLzEndpoint, // lzEndpoint
			deployer, // delegate
			assetInSepoliaAddress, // asset
		],
		log: true,
		skipIfAlreadyDeployed: false,
	});

	console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`);
};

deploy.tags = [contractName];

export default deploy;
