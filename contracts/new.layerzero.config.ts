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
				sendLibrary: "0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1",
				receiveLibraryConfig: { receiveLibrary: "0xc02Ab410f0734EFa3F14628780e6e695156024C2", gracePeriod: 0 },
				sendConfig: {
					executorConfig: { maxMessageSize: 10000, executor: "0x173272739Bd7Aa6e4e214714048a9fE699453059" },
					ulnConfig: { confirmations: 15, requiredDVNs: ["0x747C741496a507E4B404b50463e691A8d692f6Ac"], optionalDVNs: [], optionalDVNThreshold: 0 },
				},
				receiveConfig: {
					ulnConfig: { confirmations: 20, requiredDVNs: ["0x747C741496a507E4B404b50463e691A8d692f6Ac"], optionalDVNs: [], optionalDVNThreshold: 0 },
				},
			},
		},
		{
			from: flow_mainnetContract,
			to: ethereum_mainnetContract,
			config: {
				sendLibrary: "0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043",
				receiveLibraryConfig: { receiveLibrary: "0x2367325334447C5E1E0f1b3a6fB947b262F58312", gracePeriod: 0 },
				sendConfig: {
					executorConfig: { maxMessageSize: 10000, executor: "0xa20DB4Ffe74A31D17fc24BD32a7DD7555441058e" },
					ulnConfig: { confirmations: 20, requiredDVNs: ["0x9C061c9A4782294eeF65ef28Cb88233A987F4bdD"], optionalDVNs: [], optionalDVNThreshold: 0 },
				},
				receiveConfig: {
					ulnConfig: { confirmations: 15, requiredDVNs: ["0x9C061c9A4782294eeF65ef28Cb88233A987F4bdD"], optionalDVNs: [], optionalDVNThreshold: 0 },
				},
			},
		},
	],
};
