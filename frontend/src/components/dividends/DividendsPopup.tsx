import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

const TOKENS = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
];

export function DividendsPopup({
  open,
  onClose,
  profit,
}: {
  open: boolean;
  onClose: () => void;
  profit: number | null;
  onPay: (percentage: number, tokens: string[]) => void;
}) {

  if (!open || profit == null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card>
        <CardHeader>
          <CardTitle className="text-center font-mono text-2xl text-[#5a189a]">
            Pay Dividends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-[400px] flex flex-col items-center gap-4">
            <span className="text-lg font-semibold">
              There are no profits to distribute.
              </span>
            <span className="text-lg font-semibold">
              You have a negative bottom line of ${profit.toLocaleString()}.
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="flex items-center gap-2">
            <XIcon className="w-4 h-4" />
            Close
          </Button>
        </CardFooter> 
      </Card>
    </div>
  );
}