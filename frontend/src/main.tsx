import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Home } from "./pages/home";

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

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
