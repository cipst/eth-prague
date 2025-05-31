import { API_CONFIG } from "@/config/api";
import { defaultCurrencyUnits, SUPPORTED_CHAINS_ID } from "@/config/chain";

export interface ChainData {
	chainId: string;
	explorerUrl: string;
	explorerLogo: string;
	currencySymbol: string;
	currencyWeiName: string;
}

const fetchChainData = async (chainId: string, signal?: AbortSignal): Promise<ChainData> => {
	const response = await fetch(`${API_CONFIG.CHAINS_API.BASE_URL}${API_CONFIG.CHAINS_API.ENDPOINTS.CHAIN(chainId)}`, { signal });

	if (!response.ok) throw new Error(`Failed to fetch chain data for chain ID ${chainId}`);

	const data = await response.json();
	const explorerUrl = data.explorers?.[0]?.url;
	const explorerLogo = data.logo;
	const currencySymbol = data.native_currency || defaultCurrencyUnits.ether;
	const currencyWeiName = defaultCurrencyUnits.wei;

	if (!explorerUrl) throw new Error(`No explorer URL found for chain ID ${chainId}`);

	if (!currencySymbol) throw new Error(`No currency symbol found for chain ID ${chainId}`);

	const cleanExplorerUrl = explorerUrl.replace(/\/$/, "");

	const chainData: ChainData = {
		explorerUrl: cleanExplorerUrl,
		explorerLogo: explorerLogo || "",
		currencySymbol,
		currencyWeiName,
		chainId,
	};

	return chainData;
};

export const fetchChains = async () => {
	const promises: Promise<ChainData>[] = [];

	Object.keys(SUPPORTED_CHAINS_ID).map((chainId) => {
		promises.push(fetchChainData(chainId));
	});

	const chains = await Promise.all(promises);

	return chains;
};
