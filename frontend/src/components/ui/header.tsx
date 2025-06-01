import { SearchIcon } from "lucide-react";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";
import { MetamaskButton } from "./metamask-button";
import { Input } from "./input";
import { Button } from "./button";
import { useEffect, useState } from "react";
import { FAKE_VAULT_INFO, VAULT_INFO } from "@/config/vault";
import { useAccount } from "wagmi";
import { VlayerButton } from "./vlayer-prover-button";
import { useBalance } from "@/hooks/use-vlayer";
import { useLocation, useNavigate } from "react-router";
import DeComLogo from "@/assets/DeCom_logo.webp";

export const Header = ({ className }: { className?: string }) => {
	const { address: accountAddress } = useAccount();
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (!searchQuery.trim()) return;

		// Navigate to the search results page with the query
		navigate("/info");
	};

	const { data:balance } = useBalance(accountAddress as `0x${string}`);
	useEffect(() => {
    
    console.log("Balance for accountAddress", accountAddress, "is", balance);
  },[balance,accountAddress]);
	return (
		<header
			className={cn(
				"flex z-50 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.17)] fixed w-full items-center justify-between h-24 px-4 py-3 gap-10 bg-white border-b border-b-gray-500",
				className
			)}>
			<h1 className="font-bold uppercase text-5xl flex items-center gap-2"><img src={DeComLogo} className="w-14 h-14 rounded-full" />DeCom</h1>
			<div className="flex gap-2 items-center h-full">
				{accountAddress && (
					<>
						<h3 className="cursor-pointer group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
							{location.pathname.includes("info") ? FAKE_VAULT_INFO.company_name : VAULT_INFO.company_name}
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
