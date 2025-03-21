import { createContext } from "react";
import type { Movie } from "@/schemas/moviesSchema";
import useMovies from "@/hooks/useMovies";

interface MoviePropsContext {
	moviesPopular: Movie[];
	moviesNowPlaying: Movie[];
	moviesTopRated: Movie[];
}

export const ContextMovies = createContext({
	moviesPopular: [],
	moviesNowPlaying: [],
	moviesTopRated: [],
} as MoviePropsContext);

function ContextMoviesProvide({ children }: { children: React.ReactNode }) {
	const popularQuery = useMovies({ typeCategoryMovie: "popular" });
	const nowPlayingQuery = useMovies({ typeCategoryMovie: "now_playing" });
	const topRatedQuery = useMovies({ typeCategoryMovie: "top_rated" });

	const error =
		popularQuery.error || nowPlayingQuery.error || topRatedQuery.error;

	if (error) {
		return (
			<div>
				<p>{error.message}</p>
			</div>
		);
	}

	return (
		<ContextMovies.Provider
			value={{
				moviesPopular: popularQuery.data || [],
				moviesNowPlaying: nowPlayingQuery.data || [],
				moviesTopRated: topRatedQuery.data || [],
			}}
		>
			{children}
		</ContextMovies.Provider>
	);
}

export default ContextMoviesProvide;
