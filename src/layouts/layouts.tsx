import ToggleTheme from "@/components/theme/toggleTheme";
import { Clapperboard, Compass } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const styleHeader =
	"sticky top-0 z-50 w-full border-b bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center";

const getLink = (isActive: boolean) =>
	isActive
		? "bg-purple-700/15 flex items-center gap-1.5 p-1.5 font-medium text-purple-600 rounded-sm"
		: "flex items-center gap-1.5 text-muted-foreground";

export default function Layouts() {
	const location = useLocation();

	return (
		<div>
			<header className={styleHeader}>
				<h1>Logo</h1>

				<nav className="flex gap-4 text-sm">
					<Link to="/" className={getLink(location.pathname === "/")}>
						<Compass /> Explorer
					</Link>
					<Link
						to="moviesfavorites"
						className={getLink(location.pathname === "/moviesfavorites")}
					>
						<Clapperboard /> Meus Filmes
					</Link>
				</nav>

				<div>
					<ToggleTheme />
				</div>
			</header>

			<main className="max-w-7xl mx-auto p-4 min-h-screen">
				<Outlet/>
			</main>
		</div>
	);
}
