import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Loader2 } from "lucide-react";
import { useDividendsPopup } from "@/hooks/useDividendsPopup";
import { DividendsPopup } from "../dividends/DividendsPopup";

const incomeStatementData = Object.freeze([
  {
    revenue: 120000,
    cost: 75000,
    profit: 45000,
  },
  {
    revenue: 95000,
    cost: 50000,
    profit: 45000,
  },
  {
    revenue: 200000,
    cost: 140000,
    profit: 60000,
  },
]);

export const IncomeStatement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const {
    open,
    openPopup,
    closePopup,
    profit,
  } = useDividendsPopup();

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
          <CardTitle className="font-mono uppercase text-2xl">Income Statement</CardTitle>
          <CardAction>
            <Button onClick={handlePayDividends} className="mr-2">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" /> <span>Pay dividends</span>
                </div>
              ) : (
                <>Pay dividends</>
              )}
            </Button>
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
                <TableCell className="font-semibold text-lg">Revenues</TableCell>
                <TableCell className="text-right text-lg">$ {incomeStatementData[index].revenue.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Costs</TableCell>
                <TableCell className="text-right text-lg">$ {incomeStatementData[index].cost.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-lg">Profit</TableCell>
                <TableCell className="text-right text-lg">$ {incomeStatementData[index].profit.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <DividendsPopup
        open={open}
        onClose={closePopup}
        profit={profit ?? 0}
        onPay={handlePay}
      />
    </>
  );
};