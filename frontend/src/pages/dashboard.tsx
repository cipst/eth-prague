import { BalanceSheet } from "@/components/dashboard/balance-sheet";
import { IncomeStatement } from "@/components/dashboard/income-statement";
// import { wagmiContractConfig } from "@/config/contracts";
// import { useReadContract } from "wagmi";

export const Dashboard = () => {
	// const { data: shares } = useReadContract({
	// 	...wagmiContractConfig,
	// 	functionName: "deposit",
	// 	args: [10],
	// });

	// alert(shares);

	return (
		<div className="flex flex-wrap items-start justify-center gap-5">
			<BalanceSheet />
			<IncomeStatement />
		</div>
	);
};
