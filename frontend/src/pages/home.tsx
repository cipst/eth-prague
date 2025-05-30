import { Header } from "@/components/ui/header";
import { Sidebar } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export const Home = () => {
	return (
		<>
			<main className="h-full flex">
				<Header />
				<Sidebar className="pt-20" />
				<div className="pt-20">
					<Outlet />
				</div>
			</main>
		</>
	);
};
