import { SearchIcon } from "lucide-react";
import { Separator } from "./separator";

export const Header = () => {
	return (
		<header className="flex items-center justify-between h-20 px-4 py-3 gap-10 bg-white border-b border-b-gray-500">
			<h1 className="font-bold uppercase text-3xl">Deecom</h1>
			<div className="flex gap-2 items-center h-full">
				<h3 className="cursor-pointer group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
					My Company
				</h3>
				<Separator orientation="vertical" className="bg-black data-[orientation=vertical]:h-10" />
				<button className="cursor-pointer group inline-flex gap-2 h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">
					Search <SearchIcon className="h-5 w-5" />
				</button>
			</div>
			<div>WALLET METAMASK</div>
		</header>
	);
};
