import { Header } from "@/components/ui/header";
import { Sidebar } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export const Home = () => {
	return (
		<>
			<main className="h-full flex">
				<Header />
				<Sidebar className="pt-28" />
				<div className="pt-28 w-full">
					<Outlet />
				</div>
			</main>
		</>
	);
};
