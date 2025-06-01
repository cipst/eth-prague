import { ExecutorOptionType } from "@layerzerolabs/lz-v2-utilities";
import { OAppEnforcedOption, OmniPointHardhat } from "@layerzerolabs/toolbox-hardhat";
import { EndpointId } from "@layerzerolabs/lz-definitions";
import { generateConnectionsConfig } from "@layerzerolabs/metadata-tools";

const flowContract: OmniPointHardhat = {
	eid: EndpointId.FLOW_V2_MAINNET,
	contractName: "MyOFT",
};

const ethereumContract: OmniPointHardhat = {
	eid: EndpointId.ETHEREUM_V2_MAINNET,
	contractName: "DecomToken",
};

const EVM_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
	{
		msgType: 1,
		optionType: ExecutorOptionType.LZ_RECEIVE,
		gas: 80000,
		value: 0,
	},
	{
		msgType: 2,
		optionType: ExecutorOptionType.LZ_RECEIVE,
		gas: 80000,
		value: 0,
	},
	{
		msgType: 2,
		optionType: ExecutorOptionType.COMPOSE,
		index: 0,
		gas: 80000,
		value: 0,
	},
];

export default async function () {
	// note: pathways declared here are automatically bidirectional
	// if you declare A,B there's no need to declare B,A
	const connections = await generateConnectionsConfig([
		[
			flowContract, // Chain A contract
			ethereumContract, // Chain B contract
			[["LayerZero Labs"], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
			[1, 1], // [A to B confirmations, B to A confirmations]
			[EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // Chain B enforcedOptions, Chain A enforcedOptions
		],
	]);

	return {
		contracts: [{ contract: flowContract }, { contract: ethereumContract }],
		connections,
	};
}
