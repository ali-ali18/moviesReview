import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import scrollTop from "@/utils/scrollTop";

import { Outlet } from "react-router-dom";

export default function Layouts() {
	scrollTop()
	return (
		<div>
			<Header />

			<main className="max-w-6xl mx-auto p-4 min-h-screen">
				<Outlet />
			</main>
			<Toaster closeButton position="top-right" />
		</div>
	);
}
