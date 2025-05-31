import { VAULT_INFO } from "@/config/vault";
import { NETWORK_STATS_REFETCH_INTERVAL } from "@/lib/api/constants";
import type { ChainData } from "@/lib/api/fetchChain";
import { fetchTokenBalances } from "@/lib/api/fetchTokenBalances";
import { useQuery } from "@tanstack/react-query";

export const useTokenBalances = (chains: ChainData[] | undefined) => {
	return useQuery({
		queryKey: ["balance-sheet", "token-balances"],
		queryFn: async () => fetchTokenBalances(chains!, VAULT_INFO.address),
		staleTime: 10 * 1000,
		refetchInterval: NETWORK_STATS_REFETCH_INTERVAL,
		enabled: !!chains,
	});
};
