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
import { useEffect, useState } from "react";
import CardMovies from "@/components/cardMovies";

interface FetchMoviesParams {
	typeCategoryMovie: "popular" | "top_rated" | "upcoming" | "now_playing";
	page: number;
	limit: number;
}

export default function AllMovies() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);

	async function fetchMovies({
		limit = 8,
		typeCategoryMovie = "popular",
		page = currentPage,
	}: FetchMoviesParams) {
		setLoading(true);
		try {
			const response = await api.get(
				`/movie/${typeCategoryMovie}?language=pt-BR&page=${page}`,
			);
			const allMovies = response.data.results;
			const totalPagesFromApi = response.data.total_pages;
			const limitFilms = allMovies.slice(0, limit);
			setMovies(limitFilms);
			setTotalPages(totalPagesFromApi);
			return limitFilms;
		} catch (error) {
			console.error(`error: ${error}`);
			return [];
		} finally {
			setLoading(false);
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchMovies({ page: currentPage, limit: 20, typeCategoryMovie: "popular" });
	}, [currentPage]);

	// Funções para navegar entre páginas
	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	if (loading) {
		return <ComponentLoading />;
	}

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl md:text-4xl font-medium">Principais filmes</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{movies.map((movie) => (
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
							goPreviousPage({ page: currentPage, setter: setCurrentPage, totalPages: totalPages });
						}}
						className={`${
							currentPage === 1 ? "pointer-events-none opacity-50" : ""
						} text-sm sm:text-base px-2 sm:px-3`}
					/>

					{getPaginationItems({ currentPage, totalPages, setCurrentPage })}

					<PaginationNext
						href="#"
						onClick={(e) => {
							e.preventDefault();
							goNextPage({
								page: currentPage,
								setter: setCurrentPage,
								totalPages,
							});
						}}
						className={`${
							currentPage === totalPages ? "pointer-events-none opacity-50" : ""
						} text-sm sm:text-base px-2 sm:px-3`}
					/>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
