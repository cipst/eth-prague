import { BalanceSheet } from "@/components/dashboard/balance-sheet";
import { IncomeStatement } from "@/components/dashboard/income-statement";

export const Dashboard = () => {
	return (
		<div className="flex flex-wrap items-start justify-center gap-5">
			<BalanceSheet />
			<IncomeStatement />
		</div>
	);
};
