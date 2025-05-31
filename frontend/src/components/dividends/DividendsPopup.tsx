import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const TOKENS = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
];

export function DividendsPopup({
  open,
  onClose,
  profit,
  onPay,
}: {
  open: boolean;
  onClose: () => void;
  profit: number | null;
  onPay: (percentage: number, tokens: string[]) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [percentage, setPercentage] = useState(50);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [error, setError] = useState<string | null>("You do not have enough USDC to pay that and you need to sell.");

  // Reset steps and state when popup opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setPercentage(50);
      setSelectedTokens([]);
      setError("You do not have enough USDC to pay that and you need to sell.");
    }
  }, [open]);

  if (!open || profit == null) return null;

  const handleTokenToggle = (token: string) => {
    setSelectedTokens((prev) =>
      prev.includes(token)
        ? prev.filter((t) => t !== token)
        : [...prev, token]
    );
  };

  const handleNext = () => {
    setStep(2);
  };

  const handlePayClick = () => {
    if (selectedTokens.length === 0) {
      setError("Please select at least one token. You do not have enough USDC to pay that and you need to sell.");
      return;
    }
    setError("You do not have enough USDC to pay that and you need to sell.");
    // To actually call onPay, remove the line above and uncomment below:
    // onPay(percentage, selectedTokens);
  };

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
            
            {step === 1 && (
              <>
                <div className="text-lg">
                  Profit available:{" "}
                  <span className="font-mono text-[#5a189a]">
                    ${profit.toLocaleString()}
                  </span>
                </div>
                <label className="font-semibold text-[#5a189a]">
                  Select % of profit to pay:
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                  className="w-64"
                />
                <div className="text-lg font-mono">
                  {percentage}% ={" "}
                  <span className="text-[#43cea2]">
                    ${Math.round((profit * percentage) / 100).toLocaleString()}
                  </span>
                </div>
              </>
            )}
            {step === 2 && (
              <>
              <div className="w-full text-center bg-red-100 text-red-700 font-semibold rounded p-2 mb-2">
              {error}
              </div>
                <div className="text-lg font-semibold text-[#5a189a] mb-2">
                  Select tokens to sell for USDC:
                </div>
                <div className="flex gap-6">
                  {TOKENS.map((token) => (
                    <label
                      key={token.symbol}
                      className={`flex flex-col items-center cursor-pointer px-4 py-2 rounded-lg border-2 ${
                        selectedTokens.includes(token.symbol)
                          ? "border-[#5a189a] bg-[#f5f7fa]"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTokens.includes(token.symbol)}
                        onChange={() => handleTokenToggle(token.symbol)}
                        className="mb-2"
                      />
                      <span className="font-mono text-lg">{token.symbol}</span>
                      <span className="text-xs text-gray-500">{token.name}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Button variant="outline" onClick={onClose} className="w-1/2">
            Cancel
          </Button>
          {step === 1 ? (
            <Button
              className="w-1/2 bg-gradient-to-r from-[#5a189a] to-[#43cea2] text-white font-bold"
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              className="w-1/2 bg-gradient-to-r from-[#5a189a] to-[#43cea2] text-white font-bold"
              onClick={handlePayClick}
            >
              Pay
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}