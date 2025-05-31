import { cn } from "@/lib/utils";
import { Button } from "./button";
import MetamaskLogo from "@/assets/metamask-logo.svg?react";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";


export const MetamaskButton = ({ className }: { className?: string }) => {
	const { open: openWallet } = useAppKit();

	const {address:accountAddress} = useAccount();
	const connectWallet = async () => {
		await openWallet();
	};

	const handleConnectMetamask = async () => {
		if (!accountAddress) {
			await connectWallet();
		}
	};

	return (
		<div className="flex items-center justify-around h-min w-2xs">
			{!accountAddress ? (
				<Button
					onClick={handleConnectMetamask}
					className={cn(className, "bg-[#FF5C16] hover:bg-[#FFA680] hover:text-[#661800]", accountAddress && "hover:bg-[#FF5C16] hover:text-white")}>
					<MetamaskLogo /> Connect Metamask
				</Button>
			) : (
				// <div className="flex items-center w-full h-full gap-5">
				<>
					<MetamaskLogo className="w-14 h-14" />
					<div className="flex flex-col items-start">
						<span className="text-xl font-semibold">MetaMask</span>
						<span className="">
							{accountAddress.slice(0, 15)}...{accountAddress.slice(accountAddress.length - 4)}
						</span>
					</div>
				</>
				// </div>
			)}
		</div>
	);
};
