import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { HandCoinsIcon, Loader2 } from "lucide-react";
import { useDividendsPopup } from "@/hooks/useDividendsPopup";
import { DividendsPopup } from "../dividends/DividendsPopup";
import { cn } from "@/lib/utils";

const incomeStatementData = Object.freeze([
	{
		revenue: 120000,
		cost: 165000,
		profit: -45000,
	},
	{
		revenue: 95000,
		cost: 140000,
		profit: -45000,
	},
	{
		revenue: 200000,
		cost: 260000,
		profit: -60000,
	},
]);

export const IncomeStatement = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [index, setIndex] = useState(0);

	const { open, openPopup, closePopup, profit } = useDividendsPopup();

	const handleUpdate = async () => {
		setIsLoading(true);
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 1500);
		});
		const options = [0, 1, 2].filter((indexArray) => indexArray !== index);
		const randomIndex = options[Math.floor(Math.random() * options.length)];

		setIndex(randomIndex);
		setIsLoading(false);
	};

	const handlePayDividends = () => {
		openPopup(incomeStatementData[index].profit);
	};

	const handlePay = (percentage: number) => {
		// Here you would trigger the actual dividend payment logic
		// For now, just close the popup
		closePopup();
		// Optionally show a toast or notification
	};

	return (
		<>
			<Card className="w-xl">
				<CardHeader>
					<CardTitle className="font-mono uppercase text-3xl">Income Statement</CardTitle>
					<CardAction>
						<Button onClick={handleUpdate}>
							{isLoading ? (
								<div className="flex items-center gap-2">
									<Loader2 className="animate-spin w-4 h-4" /> <span>Updating</span>
								</div>
							) : (
								<>Update</>
							)}
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="font-semibold text-xl">Revenues</TableCell>
								<TableCell className="text-right font-mono text-lg">$ {incomeStatementData[index].revenue.toLocaleString()}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-semibold text-xl">Costs</TableCell>
								<TableCell className="text-right font-mono text-lg">$ {incomeStatementData[index].cost.toLocaleString()}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="font-semibold text-xl">Profit</TableCell>
								<TableCell className={cn("text-right font-mono text-lg", "text-red-500 ")}>
									$ {incomeStatementData[index].profit.toLocaleString()}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className="flex ">
					<Button onClick={handlePayDividends} className="w-full">
								<HandCoinsIcon className="w-6 h-6" /> Pay dividends
						</Button>
				</CardFooter>
			</Card>
			<DividendsPopup open={open} onClose={closePopup} profit={profit ?? 0} onPay={handlePay} />
		</>
	);
};
