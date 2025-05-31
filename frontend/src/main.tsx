import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/home";
import { WagmiProvider, http, createConfig } from "wagmi";
import { baseSepolia, sepolia, optimismSepolia, foundry, avalancheFuji} from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import type { Chain } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetchChains } from "./lib/api/fetchChain";
import { Dashboard } from "./pages/dashboard";
import { ProofProvider } from "@vlayer/react";
import { getChainSpecs } from "@vlayer/sdk";
import { TransactionPopupProvider } from "@blockscout/app-sdk";
import { Bridge } from "./pages/bridge";
import { Fundraise } from "./pages/Fundraise";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				index: true,
				Component: Dashboard,
			},
			{
				path: "bridge",
				Component: Bridge
			},
			
			{
				path: "fundraise",
				Component: Fundraise
			},
		],
	},
]);

// Create a client
const queryClient = new QueryClient();

queryClient.prefetchQuery({
	queryKey: ["chain-ids"],
	queryFn: fetchChains,
	staleTime: Infinity,
});

const wagmiConfig = createConfig({
	chains: [baseSepolia, sepolia, optimismSepolia, foundry,avalancheFuji],
	connectors: [metaMask()],
	transports: {
		[baseSepolia.id]: http(),
		[sepolia.id]: http(),
		[optimismSepolia.id]: http(),
		[foundry.id]: http(),
		[avalancheFuji.id]: http(),
	},
});

const appKitProjectId = `3094f1e52379add5f05e6e00cfdab3e6`;
let chain = null;

try {
	chain = getChainSpecs(import.meta.env.VITE_CHAIN_NAME);
} catch {
	// In case of wrong chain name in env, we set chain variable to whatever.
	// Thanks to this, the app does not crash here, but later with a proper error handling.
	console.error("Wrong chain name in env: ", import.meta.env.VITE_CHAIN_NAME);
	chain = {
		id: "wrongChain",
		name: "Wrong chain",
		nativeCurrency: {},
		rpcUrls: { default: { http: [] } },
	} as unknown as Chain;
}
const chains: [Chain, ...Chain[]] = [chain];
const networks = chains;

const wagmiAdapter = new WagmiAdapter({
	projectId: appKitProjectId,
	chains,
	networks,
});

createAppKit({
	adapters: [wagmiAdapter],
	projectId: appKitProjectId,
	networks,
	defaultNetwork: chain,
	metadata: {
		name: "vlayer-web-proof-example",
		description: "vlayer Web Proof Example",
		url: "https://vlayer.xyz",
		icons: ["https://avatars.githubusercontent.com/u/179229932"],
	},
	themeVariables: {
		"--w3m-color-mix": "#551fbc",
		"--w3m-color-mix-strength": 40,
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<TransactionPopupProvider>
				<WagmiProvider config={wagmiAdapter.wagmiConfig}>
					<ProofProvider
						config={{
							proverUrl: import.meta.env.VITE_PROVER_URL,
							wsProxyUrl: import.meta.env.VITE_WS_PROXY_URL,
							notaryUrl: import.meta.env.VITE_NOTARY_URL,
							token: import.meta.env.VITE_VLAYER_API_TOKEN,
						}}>
						<RouterProvider router={router} />
						<ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-left" />
					</ProofProvider>
				</WagmiProvider>
			</TransactionPopupProvider>
		</QueryClientProvider>
	</StrictMode>
);
