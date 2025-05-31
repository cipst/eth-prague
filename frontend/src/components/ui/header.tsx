import { SearchIcon } from "lucide-react";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";
import { MetamaskButton } from "./metamask-button";
import { useMetamask } from "@/lib/contexts/metamask";
import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";

export const Header = ({ className }: { className?: string }) => {
	const { accountAddress } = useMetamask();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;

		// Determine if the search query is a block number, transaction hash, or address
		if (/^\d+$/.test(searchQuery)) {
			// TODO complete this
		} else if (searchQuery.startsWith("0x") && searchQuery.length === 66) {
			// TODO complete this
		} else if (searchQuery.startsWith("0x") && searchQuery.length === 42) {
			// TODO complete this
		} else {
			// Handle invalid search query
			console.error("Invalid search query");
			alert("Invalid search query");
		}
	};

	return (
		<header
			className={cn(
				"flex z-50 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.17)] fixed w-full items-center justify-between h-24 px-4 py-3 gap-10 bg-white border-b border-b-gray-500",
				className
			)}>
			<h1 className="font-bold uppercase text-5xl">DeCom</h1>
			<div className="flex gap-2 items-center h-full">
				{accountAddress && (
					<>
						<h3 className="cursor-pointer group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
							My Company
						</h3>
						<Separator orientation="vertical" className="bg-black data-[orientation=vertical]:h-10" />
					</>
				)}
				<form onSubmit={handleSearch} className="flex w-[500px] gap-2 ml-2">
					<Input
						placeholder="Search by Address / Txn Hash / Block / Token"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="flex-1"
					/>
					<Button type="submit">
						<SearchIcon className="h-4 w-4 mr-2" />
						Search
					</Button>
				</form>
			</div>
			<div>
				<MetamaskButton />
			</div>
		</header>
	);
};
