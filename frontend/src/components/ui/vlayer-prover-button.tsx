import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useVlayer } from "@/hooks/use-vlayer";
import { RefreshCw } from "lucide-react";

export const VlayerButton = ({ className }: { className?: string }) => {
	const { address } = useAccount();
	const [disabled, setDisabled] = useState(false);

	const { requestWebProof, webProof, callProver, isPending, isCallProverIdle, result, error, handleMint, isMinting } = useVlayer();

	useEffect(() => {
		try {
			if (webProof && isCallProverIdle) {
				void callProver([webProof, address]);
			}
		} catch (e) {
			console.error("Error calling prover:", e);
		}
	}, [webProof, address, callProver, isCallProverIdle]);

	useEffect(() => {
		if (isMinting) return;
		if (result) {
			handleMint();
		}
	}, [result, handleMint, isMinting]);

	useEffect(() => {
		if (error) {
			// handle error if needed
		}
	}, [error]);

	const canMint = !!result && !isMinting;

	return (
		<div className={`flex justify-center flex-col items-center${className ? ` ${className}` : ""}`}>
			<button
				className="flex items-center gap-2"
				disabled={disabled || isPending || isMinting}
				id="nextButton"
				onClick={() => {
					if (canMint) {
						handleMint();
					} else {
						requestWebProof();
						setDisabled(true);
					}
				}}>
				{isMinting ? (
					"Minting..."
				) : isPending ? (
					"Proving in progress..."
				) : canMint ? (
					"Mint"
				) : (
					<>
						<RefreshCw className="w-4 h-4" /> Update CEX balance
					</>
				)}
			</button>
		</div>
	);
};
