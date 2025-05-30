import { fetchChains } from "@/lib/api/fetchChain";
import { useQuery } from "@tanstack/react-query";

export const useChains = () => {
	const response = useQuery({
		queryKey: ["chain-ids"],
		queryFn: fetchChains,
		staleTime: Infinity,
	});

	return response;
};
