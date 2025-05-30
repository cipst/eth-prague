import { fetchTokenBalances } from "@/lib/api/fetchTokenBalances";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useChains } from "@/hooks/useChains";
import { NETWORK_STATS_REFETCH_INTERVAL } from "@/lib/api/constants";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { VAULT_INFO } from "@/config/vault";

export const BalanceSheet = () => {
	const { data: chains } = useChains();
	const { data, error, isLoading, isError, isFetching, isPending } = useQuery({
		queryKey: ["balance-sheet"],
		queryFn: async () => fetchTokenBalances(chains!, VAULT_INFO.address),
		staleTime: 10 * 1000,
		refetchInterval: NETWORK_STATS_REFETCH_INTERVAL,
		enabled: !!chains,
	});

	if (isLoading || isFetching || isPending) {
		return (
			<Card className="w-xl">
				<CardHeader>
					<CardTitle>Balance Sheet</CardTitle>
					{/* <CardDescription>Card Description</CardDescription> */}
					<CardAction>
						<Skeleton className="w-[200px] h-6" />
					</CardAction>
				</CardHeader>
				<CardContent></CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		);
	}

	if (isError) {
		return <div>{error.message}</div>;
	}

	return (
		<div className="flex flex-wrap items-center justify-center gap-5">
			<Card className="w-xl">
				<CardHeader>
					<CardTitle>Balance Sheet</CardTitle>
					{/* <CardDescription>Card Description</CardDescription> */}
					<CardAction>
						<Button>Update CEX balance</Button>
					</CardAction>
				</CardHeader>
				<CardContent></CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
			<Card className="w-xl">
				<CardHeader>
					<CardTitle>Income Statement</CardTitle>
					{/* <CardDescription>Card Description</CardDescription> */}
					<CardAction>
						<Button>Update</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					<p>Card Content</p>
				</CardContent>
				<CardFooter>
					<p>Card Footer</p>
				</CardFooter>
			</Card>
		</div>
	);
};
