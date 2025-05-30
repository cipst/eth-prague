export const API_CONFIG = {
	CHAINS_API: {
		BASE_URL: "https://chains.blockscout.com/api",
		ENDPOINTS: {
			CHAIN: (chainId: string) => `/chains/${chainId}`,
		},
	},
} as const;
