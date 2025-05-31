export const API_CONFIG = {
	CHAINS_API: {
		BASE_URL: "https://chains.blockscout.com/api",
		ENDPOINTS: {
			CHAIN: (chainId: string) => `/chains/${chainId}`,
		},
	},
	EXPLORER_API: {
		FALLBACK_URL: "https://evm.flowscan.io",
		ENDPOINTS: {
			ADDRESS_TOKEN_BALANCES: (hash: string) => `/api/v2/addresses/${hash}/token-balances`,
		},
	},
} as const;
