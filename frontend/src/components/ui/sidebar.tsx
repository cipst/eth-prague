import { cn } from "@/lib/utils";
import { BanknoteArrowUpIcon, GalleryVerticalEndIcon, HandCoinsIcon, HomeIcon, WaypointsIcon } from "lucide-react";
// import { Button } from "./button";
import { Link, useLocation } from "react-router";

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
	return (
		<nav className={cn("border w-xs h-full", className)}>
			<section className="w-full h-60 bg-gray-500 flex items-center justify-center">COMPANY WALLET</section>
			<section>
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
