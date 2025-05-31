import { VAULT_INFO } from "@/config/vault";
import { useChains } from "@/hooks/useChains";
import { useTransactionPopup } from "@blockscout/app-sdk";
import { Button } from "./button";
import { GalleryVerticalEndIcon } from "lucide-react";

export const TransactionHistoryButton = ({ className }: { className?: string }) => {
	const { openPopup } = useTransactionPopup();
	const { data: chains } = useChains();

	const viewHistory = () => {
		openPopup({
			chainId: chains![0].chainId,
			address: VAULT_INFO.address,
		});
	};

	return (
		<Button className={className} variant="default" size="lg" onClick={viewHistory}>
			<div className="flex items-center gap-2 font-semibold">
				<GalleryVerticalEndIcon className="size-6" /> View Transaction History
			</div>
		</Button>
	);
};
