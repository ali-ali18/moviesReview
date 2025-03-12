import { Clapperboard, Compass, Flame } from "lucide-react";
import ToggleTheme from "./theme/toggleTheme";
import { Link, useLocation } from "react-router-dom";
import DrawerNav from "./drawerNav";
import SheetNav from "./headerComponents/sheetNav";

export default function Header() {
	const styleHeader =
		"sticky top-0 z-50 w-full border-b bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center";

	const location = useLocation();

	const getLink = (isActive: boolean) => {
		return isActive
			? "bg-purple-700/15 flex items-center gap-1.5 p-1.5 font-medium text-purple-600 rounded-sm"
			: "flex items-center gap-1.5 text-muted-foreground";
	};
	return (
		<header className={styleHeader}>
			<h1>Logo</h1>

			<nav className="gap-4 text-sm hidden md:flex">
				<Link to="/" className={getLink(location.pathname === "/")}>
					<Compass /> Explorer
				</Link>
				<Link
					to="/moviesfavorites"
					className={getLink(location.pathname === "/moviesfavorites")}
				>
					<Clapperboard /> Meus Filmes
				</Link>
				<Link
					to="/movies/tendencias"
					className={getLink(location.pathname === "/movies/tendencias")}
				>
					<Flame /> Tendências
				</Link>
			</nav>

            <div className="md:hidden">
                <SheetNav/>
            </div>

			<div className="flex justify-center items-center gap-2.5">
				<ToggleTheme />
				<div className="md:hidden">
					<DrawerNav />
				</div>
			</div>
		</header>
	);
}
