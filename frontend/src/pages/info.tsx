import { BalanceSheet } from "@/components/info/balance-sheet";
import { IncomeStatement } from "@/components/info/income-statement";
// import { wagmiContractConfig } from "@/config/contracts";
// import { useReadContract } from "wagmi";

export const FakeVaultInfo = () => {

    return (
        <div className="flex flex-wrap items-start justify-center gap-5">
            <BalanceSheet />
            <IncomeStatement />
        </div>
    );
};
