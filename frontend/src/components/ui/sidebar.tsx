import { cn } from "@/lib/utils";
import { BanknoteArrowUpIcon, HomeIcon, WaypointsIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Collapsible, CollapsibleContent } from "./collapsible";
import { useState } from "react";
import { useChains } from "@/hooks/useChains";
import { Skeleton } from "./skeleton";
import { SUPPORTED_CHAINS_ID } from "@/config/chain";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { FAKE_VAULT_INFO, VAULT_INFO } from "@/config/vault";
import { AddressIcon } from "./address-icon";
import { TransactionHistoryButton } from "./transaction-history-button";

const links = [
	{
		title: "Home",
		url: "/",
		icon: HomeIcon,
	},
	{
		title: "Bridge",
		url: "/bridge",
		icon: WaypointsIcon,
	},
	
	{
		title: "Fundraise",
		url: "/fundraise",
		icon: BanknoteArrowUpIcon,
	},
];

export const Sidebar = ({ className }: { className?: string }) => {
	const { pathname } = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const { data: chains } = useChains();
	const location = useLocation();

	return (
		<nav className={cn("border w-sm h-full", className)}>
			<section className="w-full h-30 flex items-center justify-center gap-3">
				<img src={location.pathname.includes("info")?FAKE_VAULT_INFO.logo:VAULT_INFO.logo} alt="Logo" className="w-14 h-14 rounded-full" />
				<span className="text-2xl font-semibold">
					{(location.pathname.includes("info") ? FAKE_VAULT_INFO : VAULT_INFO).address.slice(0, 10)}...{(location.pathname.includes("info") ? FAKE_VAULT_INFO : VAULT_INFO).address.slice(-4)}
				</span>
			</section>
			<section className="flex flex-col gap-5 px-4">
				{chains ? (
					<Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-full flex-col gap-2 mt-4">
						<div className="flex items-center justify-between gap-4 px-4">
							<h4 className="text-md font-semibold flex items-center gap-3">
								<Avatar>
									<AvatarImage src={chains[0].explorerLogo} />
									<AvatarFallback>{SUPPORTED_CHAINS_ID[chains[0].chainId].slice(0, 1).toUpperCase()}</AvatarFallback>
								</Avatar>
								{SUPPORTED_CHAINS_ID[chains[0].chainId]}
							</h4>
						</div>
						{chains.length > 1 && (
							<CollapsibleContent className="flex flex-col gap-2">
								{chains.slice(1).map((chain) => (
									<div key={`tab-trigger-${chain.chainId}`} className="rounded-md border px-4 py-2 font-mono text-sm">
										<Avatar>
											<AvatarImage src={chain.explorerLogo} />
											<AvatarFallback>{SUPPORTED_CHAINS_ID[chain.chainId].slice(0, 1).toUpperCase()}</AvatarFallback>
										</Avatar>
										{SUPPORTED_CHAINS_ID[chain.chainId]}
									</div>
								))}
							</CollapsibleContent>
						)}
					</Collapsible>
				) : (
					<Skeleton className="h-5 w-full" />
				)}
				<div>
					{links.map((item) => (
						<Link
							to={item.url}
							key={item.title}
							className={cn(
								"hover:bg-gray-700 hover:scale-105 hover:text-white p-2 transition-all rounded-md flex items-center text-lg border border-grey-500 gap-3 font-semibold my-4",
								pathname === item.url && "bg-gray-700 text-white"
							)}>
							<item.icon className="w-7 h-7" /> <span>{item.title}</span>
						</Link>
					))}
				</div>
			</section>
			<section className="pt-32 block">
				<TransactionHistoryButton className="block mb-6 text-md mx-auto hover:scale-105" />
			</section>
		</nav>
	);
};
