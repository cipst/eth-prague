import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Header } from "./components/ui/header";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<Header />
				<nav>NAVBAR</nav>
				<Outlet />
			</>
		),
		children: [
			{
				index: true,
				Component: () => <>Home</>,
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
