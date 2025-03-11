import type { Movie } from "@/schemas/moviesSchema";
import { createContext, useState } from "react";

interface FavoritosContextValue {
	addFavorito: (item: Movie) => void;
	favoritos: Movie[];
}

interface ContextFavoritosProviderProps {
	children: React.ReactNode;
}

const ContextFavoritos = createContext({
	addFavorito: (_item: Movie) => {},
	favoritos: [],
} as FavoritosContextValue);

function ContextFavoritosProvider({ children }: ContextFavoritosProviderProps) {
	const [favoritos, setFavoritos] = useState<Movie[]>(() => {
        const savedFavoritos = localStorage.getItem("favoritos");
        return savedFavoritos ? JSON.parse(savedFavoritos) : []; 
    });
	function addFavorito({
		title,
		vote_average,
		release_date,
		poster_path,
		id,
	}: Movie) {
		setFavoritos((prev) => {
			const favoritoExiste = prev.find((fav) => fav.id === id);
			if (favoritoExiste) {
				const novoArray = prev.filter((fav) => fav.id !== id);

				localStorage.setItem("favoritos", JSON.stringify(novoArray));
				return novoArray;
			}

			const novoArray = [
				...prev,
				{ title, vote_average, release_date, poster_path, id },
			];
			localStorage.setItem("favoritos", JSON.stringify(novoArray));
			return novoArray;
		});
	}

	return (
		<ContextFavoritos.Provider value={{ addFavorito, favoritos }}>
			{children}
		</ContextFavoritos.Provider>
	);
}

export { ContextFavoritos, ContextFavoritosProvider };
