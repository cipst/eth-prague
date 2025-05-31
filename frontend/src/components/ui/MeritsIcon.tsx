import { Coins, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export const MeritsIcon = ({ side }: { side: "bottom" | "top" | "left" | "right" }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Coins className="w-7 h-7 text-purple-700" />
				</TooltipTrigger>
				<TooltipContent side={side} className="h-10 bg-purple-700">
					<a
						className="flex items-center text-lg gap-2"
						href="https://docs.blockscout.com/using-blockscout/merits"
						target="_blank"
						rel="noopener noreferrer">
						Perform this action and obtain Merits <ExternalLink className="w-4 h-4" />
					</a>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
