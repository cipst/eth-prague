import { cn } from "@/lib/utils";
import { BanknoteArrowUpIcon, GalleryVerticalEndIcon, HandCoinsIcon, HomeIcon, WaypointsIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Collapsible, CollapsibleContent } from "./collapsible";
import { useState } from "react";
import { useChains } from "@/hooks/useChains";
import { Skeleton } from "./skeleton";
import { SUPPORTED_CHAINS_ID } from "@/config/chain";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { VAULT_INFO } from "@/config/vault";
import { AddressIcon } from "./address-icon";

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
		title: "Transaction History",
		url: "/history",
		icon: GalleryVerticalEndIcon,
	},
	{
		title: "Dividends",
		url: "/dividends",
		icon: HandCoinsIcon,
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

	return (
		<nav className={cn("border w-xs h-full", className)}>
			<section className="w-full h-60 bg-gray-500 flex items-center justify-center">
				<AddressIcon />
				<span>
					{VAULT_INFO.address.slice(0, 10)}...{VAULT_INFO.address.slice(-4)}
				</span>
			</section>
			<section>
				{chains ? (
					<Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-full flex-col gap-2 mt-4 mb-5">
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
										{SUPPORTED_CHAINS_ID[chain.chainId]}
										{chain.explorerLogo}
									</div>
								))}
							</CollapsibleContent>
						)}
					</Collapsible>
				) : (
					<Skeleton className="h-5 w-full" />
				)}
				{links.map((item) => (
					<Link
						to={item.url}
						key={item.title}
						className={cn(
							"hover:bg-gray-700 hover:scale-105 hover:text-white p-2 transition-all rounded-md flex items-center text-lg border border-grey-500 mx-4 gap-3 font-semibold my-2",
							pathname === item.url && "bg-gray-700 text-white"
						)}>
						<item.icon className="w-7 h-7" /> <span>{item.title}</span>
					</Link>
				))}
			</section>
		</nav>
	);
};
