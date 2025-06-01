import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import { useAccount } from "wagmi";

export const FundraiserComponent = ({
  totalShares = 1000,
  sharesSold = 0,
}: {
  totalShares?: number;
  sharesSold?: number;
}) => {
  const [step, setStep] = useState<"form" | "loading" | "progress">("form");
  const [mintAmount, setMintAmount] = useState("");
  const [price, setPrice] = useState("");
  // Hardcode sold to 0
  const sold = 0;
  const { address } = useAccount();

  // Check localStorage for this address
  useEffect(() => {
    if (address) {
      const hasParticipated = localStorage.getItem(`fundraiser_${address}`);
      if (hasParticipated === "1") {
        setStep("progress");
      }
    }
  }, [address]);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("loading");
    // Mark this address as participated
    if (address) {
      localStorage.setItem(`fundraiser_${address}`, "1");
    }
    // Simulate async minting
    setTimeout(() => {
      setStep("progress");
    }, 1800);
  };

  // Progress bar percent
  const percent = Math.min(100, (sold / totalShares) * 100);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card>
        <CardHeader>
          <CardTitle className="font-mono uppercase text-center text-3xl">
            Fundraiser
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === "form" && (
            <form
              className="flex flex-col gap-6 items-center w-[350px] mx-auto"
              onSubmit={handleMint}
            >
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-lg text-[#5a189a] text-center">
                  Number of Shares to Mint
                </label>
                <input
                  type="number"
                  min={1}
                  max={totalShares - sold}
                  required
                  className="border rounded px-4 py-2 text-xl text-center font-mono"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  placeholder="Enter shares"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-lg text-[#5a189a] text-center">
                  Price per Share
                </label>
                <input
                  type="number"
                  min={0}
                  step="any"
                  required
                  className="border rounded px-4 py-2 text-xl text-center font-mono"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
              <Button
                type="submit"
                className="w-full text-xl py-3 bg-gradient-to-r from-[#5a189a] to-[#43cea2] text-white font-bold rounded-xl shadow-lg"
                disabled={
                  !mintAmount ||
                  !price ||
                  Number(mintAmount) < 1 ||
                  Number(mintAmount) > totalShares - sold
                }
              >
                Mint Shares
              </Button>
            </form>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
              <Loader2 className="animate-spin w-10 h-10 text-[#5a189a]" />
              <span className="text-lg font-semibold text-[#5a189a]">Minting your shares...</span>
            </div>
          )}

          {step === "progress" && (
            <div className="flex flex-col items-center gap-6 w-[350px] mx-auto">
              <div className="w-full flex flex-col items-center">
                <span className="font-semibold text-lg text-[#5a189a] mb-2">
                  Shares Sold: 0 / {totalShares}
                </span>
                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#5a189a] to-[#43cea2] h-6 transition-all"
                    style={{ width: `0%` }}
                  />
                </div>
                <span className="mt-2 font-mono text-base text-gray-700">
                  0.0% of shares sold
                </span>
              </div>
              <div className="flex items-center gap-2 text-md text-gray-600 underline cursor-pointer">
                Share this link <ExternalLink className="w-5 h-5" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};