import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/home";
import { MetamaskProvider } from "./lib/contexts/metamask";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetchChains } from "./lib/api/fetchChain";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		children: [
			{
				index: true,
				Component: () => <>Dashboard</>,
			},
			{
				path: "bridge",
				Component: () => <>Bridge</>,
			},
			{
				path: "history",
				Component: () => <>Transaction Hisotry</>,
			},
			{
				path: "dividends",
				Component: () => <>Pay dividends</>,
			},
			{
				path: "fundraise",
				Component: () => <>Fundraise</>,
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

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<MetamaskProvider>
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-left" />
			</MetamaskProvider>
		</QueryClientProvider>
	</StrictMode>
);
