import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { Loader2, ArrowDown, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import FlowLogo from "@/assets/flow-logo.jpg";
import EthLogo from "@/assets/ethereum-eth-logo.png";

export const BridgeShares = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ethAmount, setEthAmount] = useState("");
  const [flowAmount, setFlowAmount] = useState("");

  const conversionRate = 1;

  const handleEthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEthAmount(value);
    const num = parseFloat(value);
    setFlowAmount(isNaN(num) ? "" : (num * conversionRate).toString());
  };

  const handleBridge = async () => {
    setIsLoading(true);
    setIsSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setEthAmount("");
      setFlowAmount("");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card>
          <CardHeader>
            <CardTitle className="font-mono uppercase  text-center text-2xl">
              Bridge SHARES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4 items-center">
              <Skeleton className="w-48 h-8 mb-4" />
              {Array.from({ length: 1 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 mb-2 w-full justify-center">
                  <Skeleton className="rounded-full w-12 h-12" />
                  <Skeleton className="w-32 h-7" />
                  <Skeleton className="w-28 h-7 ml-auto" />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <ArrowDown className="w-10 h-10 text-[#5a189a] bg-white rounded-full shadow p-2" />
            </div>
            <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4 items-center">
              <Skeleton className="w-48 h-8 mb-4" />
              <div className="flex items-center gap-4 mb-2 w-full justify-center">
                <Skeleton className="rounded-full w-12 h-12" />
                <Skeleton className="w-32 h-7" />
                <Skeleton className="w-28 h-7 ml-auto" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <span className="flex items-center gap-2 text-[#5a189a] text-lg">
              <Loader2 className="animate-spin w-6 h-6" /> Bridging...
            </span>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Card>
          <CardHeader>
            <CardTitle className="font-mono uppercase text-center text-2xl">
              Bridge SHARES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4 py-12">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <span className="text-2xl font-semibold text-green-600">Transaction successfully completed!</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card>
        <CardHeader>
          <CardTitle className="font-mono uppercase text-center text-2xl">
            Bridge SHARES
          </CardTitle>
          <span className="text-base text-gray-500 text-center block">Fast, secure, and seamless bridging</span>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4 items-center">
            <label className="text-lg text-gray-600 font-semibold mb-2 text-center">From</label>
            <div className="flex items-center gap-4 w-full justify-center">
              <Avatar className="w-12 h-12">
                <AvatarImage src={EthLogo} />
                <AvatarFallback>ETH</AvatarFallback>
              </Avatar>
              <span className="font-bold text-2xl text-gray-800">ETH</span>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="0.0"
                className="ml-auto w-48 text-right font-mono border rounded px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-[#5a189a]/50 transition"
                value={ethAmount}
                onChange={handleEthChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <ArrowDown className="w-10 h-10 text-[#5a189a] bg-white rounded-full shadow p-2" />
          </div>

          <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4 items-center">
            <label className="text-lg text-gray-600 font-semibold mb-2 text-center">To</label>
            <div className="flex items-center gap-4 w-full justify-center">
              <Avatar className="w-12 h-12">
                <AvatarImage src={FlowLogo} />
                <AvatarFallback>FLOW</AvatarFallback>
              </Avatar>
              <span className="font-bold text-2xl text-gray-800">FLOW</span>
              <input
                type="number"
                placeholder="0.0"
                className="ml-auto w-48 text-right font-mono border rounded px-4 py-2 text-xl bg-gray-50"
                value={flowAmount}
                readOnly
                disabled
              />
            </div>
          </div>
          <Button
            className="text-xl h-12 flex justify-center items-center mt-4 w-full"
            onClick={handleBridge}
            disabled={isLoading || !ethAmount || parseFloat(ethAmount) <= 0}
          >
            {isLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="animate-spin w-6 h-6" /> Bridging...
              </span>
            ) : (
              "Bridge"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};