import { movieArraySchema } from "@/schemas/moviesSchema";
import {
	fetchMovies,
	type functionFetchMoviesPopular,
} from "@/utils/moviesFunctions";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export default function useMovies({
	limit = 8,
	typeCategoryMovie,
	page = 1,
}: functionFetchMoviesPopular) {
	return useQuery({
		queryKey: ["movies", typeCategoryMovie, page, limit],
		queryFn: async () => {
			const data = await fetchMovies({ typeCategoryMovie, page, limit: 10 });
			

			try {
				const validatedData = movieArraySchema.parse(data);
				return validatedData;
			} catch (error) {
				if (error instanceof z.ZodError) {
					console.error("Erro de validação:", error.errors);
					throw new Error("Erro ao validar os erros da api");
				}
				throw error;
			}
		},
		staleTime: 1000 * 60 * 5,
	});
}
