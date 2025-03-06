import { Clapperboard, Compass, Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import ButtonNav from "./headerComponents/buttonNavMoba";

export default function DrawerNav() {
	return (
		<Drawer>
			<DrawerTrigger asChild className="cursor-pointer">
				<Menu size={20} />
			</DrawerTrigger>
			<DrawerContent className="py-2">
				<ul className="flex flex-col gap-1.5 my-3.5">
					<ButtonNav url="/">
						<Compass /> Explorer
					</ButtonNav>
					<ButtonNav url="/moviesfavorites">
						<Clapperboard /> Meus Filmes
					</ButtonNav>
				</ul>
			</DrawerContent>
		</Drawer>
	);
}
