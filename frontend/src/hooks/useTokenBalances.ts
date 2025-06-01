import { NETWORK_STATS_REFETCH_INTERVAL } from "@/lib/api/constants";
import type { ChainData } from "@/lib/api/fetchChain";
import { fetchTokenBalances } from "@/lib/api/fetchTokenBalances";
import { useQuery } from "@tanstack/react-query";

export const useTokenBalances = (chains: ChainData[] | undefined, address: string) => {
	return useQuery({
		queryKey: ["balance-sheet", "token-balances", address],
		queryFn: async () => fetchTokenBalances(chains!, address),
		staleTime: 10 * 1000,
		refetchInterval: NETWORK_STATS_REFETCH_INTERVAL,
		enabled: !!chains,
	});
};
