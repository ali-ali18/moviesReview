import type { Movie } from "@/schemas/moviesSchema";
import api from "@/services/api";
import { createContext, useState } from "react";

interface SearchMovieContextProps {
	searchMovie: (query: string) => Promise<void>;
    moviesSearch: Movie[]
}

interface SearchMovieProviderProps {
	children: React.ReactNode;
}

export const SearchMovieContext = createContext({
	searchMovie: async (_query: string) => {},
	moviesSearch: []
} as SearchMovieContextProps);

function SearchProvider({ children }: SearchMovieProviderProps) {
    const [moviesSearch, setMovieSearch] = useState<Movie[]>([])

	async function searchMovie(query: string) {
		try {
			const response = await api.get("/search/movie", {
				params: {
					query: query,
					language: "pt-BR",
				},
			});
			const result = response.data.results
            setMovieSearch(result)
			console.log(response.data.results);
		} catch (error) {
			console.error(error);
		}
	}

    

	return (
		<SearchMovieContext.Provider value={{ searchMovie, moviesSearch }}>
			{children}
		</SearchMovieContext.Provider>
	);
}

export default SearchProvider;
