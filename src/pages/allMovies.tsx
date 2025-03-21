import ComponentLoading from "@/components/componentLoading";
import {
	Pagination,
	PaginationContent,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	getPaginationItems,
	goNextPage,
	goPreviousPage,
} from "@/utils/navigationPages";
import type { Movie } from "@/schemas/moviesSchema";
import api from "@/services/api";
import { useState } from "react";
import CardMovies from "@/components/cardMovies";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface FetchMoviesParams {
	typeCategoryMovie: "popular" | "top_rated" | "upcoming" | "now_playing";
	page: number;
	limit: number;
}

async function fetchMovies({
	limit = 8,
	typeCategoryMovie = "popular",
	page = 1,
}: FetchMoviesParams) {
	const response = await api.get(
		`/movie/${typeCategoryMovie}?language=pt-BR&page=${page}`,
	);
	const allMovies = response.data.results;
	const totalPagesFromApi = Math.min(response.data.total_pages, 500);
	const limitFilms = allMovies.slice(0, limit);
	return { movies: limitFilms, totalPages: totalPagesFromApi };
}

export default function AllMovies() {
	const [currentPage, setCurrentPage] = useState(1);

	const { data, isLoading, isError } = useQuery({
		queryKey: ["movies", "popular", currentPage],
		queryFn: () =>
			fetchMovies({
				limit: 20,
				typeCategoryMovie: "popular",
				page: currentPage,
			}),
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 5,
	});

	if (isLoading) {
		return <ComponentLoading />;
	}

	if (isError) {
		return <p>Erro ao carregar os filmes dessa pagina!</p>
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl md:text-4xl font-medium">Principais filmes</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{data?.movies.map((movie: Movie) => (
					<CardMovies
						key={movie.id}
						dataPub={movie.release_date}
						id={movie.id}
						titulo={movie.title}
						urlImg={movie.poster_path}
						voteAverage={
							movie.vote_average ? Math.min(movie.vote_average, 10) / 2 : 0
						}
					/>
				))}
			</div>

			{/* Paginação */}
			<Pagination className="mt-4">
				<PaginationContent className="flex justify-center items-center gap-1 sm:gap-2 max-w-full overflow-x-auto">
					<PaginationPrevious
						href="#"
						onClick={(e) => {
							e.preventDefault();
							goPreviousPage({
								page: currentPage,
								setter: setCurrentPage,
								totalPages: data?.totalPages,
							});
						}}
						className={`${
							currentPage === 1 ? "pointer-events-none opacity-50" : ""
						} text-sm sm:text-base px-2 sm:px-3`}
					/>

					{getPaginationItems({ currentPage, totalPages: data?.totalPages || 1, setCurrentPage })}

					<PaginationNext
						href="#"
						onClick={(e) => {
							e.preventDefault();
							goNextPage({
								page: currentPage,
								setter: setCurrentPage,
								totalPages: data?.totalPages,
							});
						}}
						className={`${
							currentPage === (data?.totalPages) ? "pointer-events-none opacity-50" : ""
						} text-sm sm:text-base px-2 sm:px-3`}
					/>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
