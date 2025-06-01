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



	return (
		<>
			<Card className="w-xl">
				<CardHeader>
					<CardTitle className="font-mono uppercase text-3xl">Income Statement</CardTitle>
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
			</Card>
		</>
	);
};
