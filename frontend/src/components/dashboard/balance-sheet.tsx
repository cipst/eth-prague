import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useChains } from "@/hooks/useChains";
import { Skeleton } from "../ui/skeleton";
import { VAULT_INFO } from "@/config/vault";
import { VlayerButton } from "../ui/vlayer-prover-button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import type { TokenBalance } from "@/types/blockchain-data";
import { useBalance } from "@/hooks/use-vlayer";
import { useAccount } from "wagmi";
import BinanceLogo from "@/assets/logoBinance.png";

export const BalanceSheet = () => {
	const { data: chains } = useChains();
	const { data: balances, error, isLoading, isError, isFetching, isPending } = useTokenBalances(chains);

	if (isLoading || isFetching || isPending) {
		return (
			<Card className="w-3xl">
				<CardHeader>
					<CardTitle>Balance Sheet</CardTitle>
					{/* <CardDescription>Card Description</CardDescription> */}
					<CardAction>
						<Skeleton className="w-[200px] h-6" />
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
							{Array.from({ length: 5 }).map((_, i) => (
								<TableRow key={`skeleton-token-balances-${i}`}>
									<TableCell className="">
										<Skeleton className="rounded-full w-8 h-8" />
									</TableCell>
									<TableCell className="">
										<Skeleton className="w-2xs h-5 mr-auto" />
									</TableCell>
									<TableCell className="">
										<Skeleton className="w-4xs h-4" />
									</TableCell>
									<TableCell className="text-right">
										<Skeleton className="w-4xs h-4" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		);
	}

	if (isError) {
		return <div>{error.message}</div>;
	}

	return (
		<Card className="w-max">
			<CardHeader>
				<CardTitle className="font-mono uppercase text-3xl">Balance Sheet</CardTitle>
				{/* <CardDescription>Card Description</CardDescription> */}
				<CardAction>
					<Button><VlayerButton/></Button>
				</CardAction>
			</CardHeader>
			<CardContent className="flex gap-10">
				<AssetsSection balances={balances} />

				<EquitySection balances={balances} />
			</CardContent>
			<CardFooter>
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};

type AssetsSectionProps = {
	balances: TokenBalance[];
};

const AssetsSection = ({ balances }: AssetsSectionProps) => {
	const { address } = useAccount();
	const { data:balance } = useBalance(address as `0x${string}`);
	
	return (<section>
		<span className="font-mono text-2xl font-semibold">ASSETS</span>
		
		<Table className="">
			<TableCaption>
				A list of {VAULT_INFO.address.slice(0, 10)}...{VAULT_INFO.address.slice(-4)}'s assets
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead></TableHead>
					<TableHead className=""></TableHead>
					<TableHead className="">Amount</TableHead>
					<TableHead className="text-right">USDT</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow key={'binance'}>
						<TableCell>
							<Avatar>
								<AvatarImage src={BinanceLogo} />
								<AvatarFallback>BINANCE</AvatarFallback>
							</Avatar>
						</TableCell>
						<TableCell className="font-semibold text-lg max-w-[200px] overflow-ellipsis truncate">{'Binance Balance'}</TableCell>
						<TableCell className="">{balance} </TableCell>
						<TableCell className="text-right">???</TableCell>
					</TableRow>
				{balances.map((balance) => (
					<TableRow key={balance.token.name}>
						<TableCell>
							<Avatar>
								<AvatarImage src={balance.token.icon_url} />
								<AvatarFallback>{balance.token.name.slice(0, 2).toUpperCase()}</AvatarFallback>
							</Avatar>
						</TableCell>
						<TableCell className="font-semibold text-lg max-w-[200px] overflow-ellipsis truncate">{balance.token.name}</TableCell>
						<TableCell className="">{(Number(balance.value) / 10 ** Number(balance.token.decimals)).toLocaleString()}</TableCell>
						<TableCell className="text-right">???</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</section>)
};

type EquitySectionProps = {
	balances: TokenBalance[];
};

const EquitySection = ({ balances }: EquitySectionProps) => {
	const totalShares = 1;
	const totalAssetsValue = 1;

	return (
		<section className="min-w-sm">
			<span className="font-mono text-2xl font-semibold">EQUITY</span>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]"></TableHead>
						<TableHead className="text-right"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell className="font-semibold text-lg">Total shares</TableCell>
						<TableCell className="text-right">???</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-semibold text-lg">Total assets value</TableCell>
						<TableCell className="text-right">???</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-semibold text-lg">Book share value</TableCell>
						<TableCell className="text-right">{totalAssetsValue / totalShares}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</section>
	);
};
