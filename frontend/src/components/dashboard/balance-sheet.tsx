import { fetchTokenBalances } from "@/lib/api/fetchTokenBalances";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useChains } from "@/hooks/useChains";
import { NETWORK_STATS_REFETCH_INTERVAL } from "@/lib/api/constants";
import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { VAULT_INFO } from "@/config/vault";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
		<Card className="w-3xl">
			<CardHeader>
				<CardTitle className="font-mono uppercase text-2xl">Balance Sheet</CardTitle>
				{/* <CardDescription>Card Description</CardDescription> */}
				<CardAction>
					<Button>Update CEX balance</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Table>
					<TableCaption>
						A list of {VAULT_INFO.address.slice(0, 10)}...{VAULT_INFO.address.slice(-4)}'s tokens
					</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead></TableHead>
							<TableHead className="w-[100px]"></TableHead>
							<TableHead className="">Amount</TableHead>
							<TableHead className="text-right">USDT</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data &&
							data.map((balance) => (
								<TableRow key={balance.token.name}>
									<TableCell>
										<Avatar>
											<AvatarImage src={balance.token.icon_url} />
											<AvatarFallback>{balance.token.name.slice(0, 2).toUpperCase()}</AvatarFallback>
										</Avatar>
									</TableCell>
									<TableCell className="font-medium">{balance.token.name}</TableCell>
									<TableCell className="">{(Number(balance.value) / 10 ** Number(balance.token.decimals)).toLocaleString()}</TableCell>
									<TableCell className="text-right">---</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};
