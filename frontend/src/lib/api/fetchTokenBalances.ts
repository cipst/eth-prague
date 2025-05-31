import type { TokenBalance } from "@/types/blockchain-data";
import type { ChainData } from "./fetchChain";
import { API_CONFIG } from "@/config/api";

export const fetchTokenBalances = async (chains: ChainData[], hash: string): Promise<TokenBalance[]> => {
	let res: TokenBalance[] = [];

	console.log("--- fetchTokenBalance() ---");

	const promises: Promise<Response>[] = [];

	for await (const chain of chains) {
		promises.push(fetch(`${chain.explorerUrl}${API_CONFIG.EXPLORER_API.ENDPOINTS.ADDRESS_TOKEN_BALANCES(hash)}`));
	}

	const responses = await Promise.all(promises);

	const results = await Promise.all<TokenBalance[]>(responses.map((r) => r.json()));

	res = results.flat();

	return res;
};
