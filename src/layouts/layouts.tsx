import Header from "@/components/header";

import { Outlet } from "react-router-dom";

export default function Layouts() {
	return (
		<div>
			<Header />

			<main className="max-w-6xl mx-auto p-4 min-h-screen">
				<Outlet />
			</main>
		</div>
	);
}
