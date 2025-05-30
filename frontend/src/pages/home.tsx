import { Header } from "@/components/ui/header";
import { Outlet } from "react-router";

export const Home = () => {
	return (
		<main>
			<Header />
			<nav>NAVBAR</nav>
			<Outlet />
		</main>
	);
};
