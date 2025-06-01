import { EndpointId } from "@layerzerolabs/lz-definitions";
const ethereum_mainnetContract = {
	eid: EndpointId.ETHEREUM_V2_MAINNET,
	contractName: "DecomToken",
};

const flow_mainnetContract = {
	eid: EndpointId.FLOW_V2_MAINNET,
	contractName: "MyOFT",
};

export default {
	contracts: [{ contract: ethereum_mainnetContract }, { contract: flow_mainnetContract }],
	connections: [
		{
			from: ethereum_mainnetContract,
			to: flow_mainnetContract,
			config: {
				sendLibrary: "0x69BF5f48d2072DfeBc670A1D19dff91D0F4E8170",
				receiveLibraryConfig: { receiveLibrary: "0x819F0FAF2cb1Fba15b9cB24c9A2BDaDb0f895daf", gracePeriod: 0 },
				sendConfig: {
					executorConfig: { maxMessageSize: 10000, executor: "0xa7BFA9D51032F82D649A501B6a1f922FC2f7d4e3" },
					ulnConfig: {
						confirmations: 6,
						requiredDVNs: ["0x9f0e79Aeb198750F963b6f30B99d87c6EE5A0467"],
						optionalDVNs: [],
						optionalDVNThreshold: 0,
					},
				},
				receiveConfig: {
					ulnConfig: {
						confirmations: 2,
						requiredDVNs: ["0x9f0e79Aeb198750F963b6f30B99d87c6EE5A0467"],
						optionalDVNs: [],
						optionalDVNThreshold: 0,
					},
				},
			},
		},
		{ from: flow_mainnetContract, to: ethereum_mainnetContract },
	],
};
