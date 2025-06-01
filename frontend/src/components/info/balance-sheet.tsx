import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useChains } from "@/hooks/useChains";
import { Skeleton } from "../ui/skeleton";
import { FAKE_VAULT_INFO, VAULT_INFO } from "@/config/vault";
import { VlayerButton } from "../ui/vlayer-prover-button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTokenBalances } from "@/hooks/useTokenBalances";
import type { TokenBalance } from "@/types/blockchain-data";
import { useBalance, useVlayer, useBalanceCreatedAt } from "@/hooks/use-vlayer";
import { useAccount } from "wagmi";
import BinanceLogo from "@/assets/logoBinance.png";
import BlockscoutLogo from "@/assets/blockscout-logo.svg?react";
import BlockscoutLogoWhite from "@/assets/blockscout-logo-white.svg?react";
import { useReadContract } from "wagmi";
import { wagmiethereumContractConfig } from "@/config/contracts";

export const BalanceSheet = () => {
	const { data: chains } = useChains();
	const { data: balances, error, isLoading, isError, isFetching, isPending } = useTokenBalances(chains, FAKE_VAULT_INFO.address);

	const { address } = useAccount();
	const { status } = useVlayer();

	const { data: balanceCreatedAt } = useBalanceCreatedAt(address as `0x${string}`, status);
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
		<div className="flex flex-col justify-center">
			<Card className="w-max">
				<CardHeader>
					<CardTitle className="font-mono uppercase text-3xl">Balance Sheet</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-10">
					<AssetsSection balances={balances} />

					<EquitySection balances={balances} />
				</CardContent>
				<CardFooter>
					<p className="flex items-center gap-2">
						Powered by Blockscout <BlockscoutLogo className="w-7 h-7" />
					</p>
				</CardFooter>
			</Card>
			<a
				href={`https://eth.blockscout.com/address/${FAKE_VAULT_INFO.address}`}
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center gap-2 justify-center rounded-bl-lg rounded-br-lg w-1/2 mx-auto bg-[#5353D3] h-8 text-lg text-white font-semibold">
				Check on Blockscout <BlockscoutLogoWhite className="w-7 h-7" />
			</a>
		</div>
	);
};

type AssetsSectionProps = {
	balances: TokenBalance[];
};

const AssetsSection = ({ balances }: AssetsSectionProps) => {
	const { address } = useAccount();
	const { status } = useVlayer();

	const { data: balance } = useBalance(address as `0x${string}`, status);

	return (
		<section>
			<span className="font-mono text-2xl font-semibold">ASSETS</span>

			<Table className="w-xl">
				<TableCaption>
					A list of {FAKE_VAULT_INFO.address.slice(0, 10)}...{FAKE_VAULT_INFO.address.slice(-4)}'s assets
				</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead></TableHead>
						<TableHead className=""></TableHead>
						<TableHead className="">Amount</TableHead>
						{/* <TableHead className="text-right pr-3">$</TableHead> */}
					</TableRow>
				</TableHeader>
				<TableBody>
					{balances.length > 0 &&
						balances.slice(0,4).map((balance) => (
							<TableRow key={balance.token.name}>
								<TableCell>
									<Avatar>
										<AvatarImage src={balance.token.icon_url} />
										<AvatarFallback>{balance.token.name.slice(0, 2).toUpperCase()}</AvatarFallback>
									</Avatar>
								</TableCell>
								<TableCell className="font-semibold text-lg max-w-[200px] overflow-ellipsis truncate">{balance.token.name}</TableCell>
								<TableCell className="text-lg">{(Number(balance.value) / 10 ** Number(balance.token.decimals)).toLocaleString()}</TableCell>
								<TableCell className="text-right font-mono text-lg">
									$ {((Number(balance.value) / 10 ** Number(balance.token.decimals)) * Number(balance.token.exchange_rate)).toLocaleString()}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</section>
	);
};

type EquitySectionProps = {
	balances: TokenBalance[];
};

const EquitySection = ({ balances }: EquitySectionProps) => {
	const totalAssetsValue = balances.reduce(
		(prev, current) => (prev += (Number(current.value) / 10 ** Number(current.token.decimals)) * Number(current.token.exchange_rate)),
		0
	);

	const { data: totalShares } = useReadContract({
		...wagmiethereumContractConfig,
		functionName: "totalShares",
	});

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
						<TableCell className="font-semibold text-xl">Total shares</TableCell>
						<TableCell className="text-right text-lg">{totalShares as number}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-semibold text-xl">Total assets value</TableCell>
						<TableCell className="text-right text-lg">{totalAssetsValue.toFixed(2)}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-semibold text-xl">Book share value</TableCell>
						<TableCell className="text-right text-lg">{Number(totalAssetsValue.toFixed(2)) / (Number(totalShares) as number)}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</section>
	);
};
