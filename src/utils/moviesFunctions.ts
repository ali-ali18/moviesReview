import api from "@/services/api";

interface functionFetchMoviesPopular {
	typeCategoryMovie: "popular" | "top_rated" | "upcoming" | "now_playing";
	page: number;
	limit: number;
}

async function fetchMovies({
	limit = 8,
	typeCategoryMovie,
	page = 1,
}: functionFetchMoviesPopular) {
	try {
		const response = await api.get(
			`/movie/${typeCategoryMovie}?language=pt-BR&page=${page}`,
		);
		const limitFilms = response.data.results.slice(0, limit);
		return limitFilms;
	} catch (error) {
		console.error(`error: ${error}`);
		return [];
	}
}
export { fetchMovies };
