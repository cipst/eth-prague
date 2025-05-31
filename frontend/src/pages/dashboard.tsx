import { BalanceSheet } from "@/components/dashboard/balance-sheet";

export const Dashboard = () => {
	return (
		<div className="flex flex-wrap items-center justify-center gap-5">
			<BalanceSheet />
		</div>
	);
};
