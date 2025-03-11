import CardMovie from "@/components/cardMovie";
import CardMovies from "@/components/cardMovies";
import type { Movie } from "@/schemas/moviesSchema";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieValidatedDados } from "@/schemas/movieSchema";
import type { MovieProps } from "@/schemas/movieSchema";
import { z } from "zod";

export default function MoviePage() {
	const { id } = useParams();
	const [movie, setMovie] = useState<MovieProps>();
	const [movieSimilars, setMovieSimilars] = useState<Movie[]>();

	useEffect(() => {
		async function fetchMovie() {
			try {
				const response = await api.get(`/movie/${id}?language=pt-BR`);
				const validatedData = movieValidatedDados.parse(response.data);
				setMovie(validatedData);
			} catch (error) {
				console.error(error);
				if (error instanceof z.ZodError) {
					console.error("Erro de validação:", error.errors);
				}
			}
		}

		fetchMovie();
	}, [id]);

	useEffect(() => {
		async function fetchMovieSimilars() {
			try {
				const response = await api.get(
					`/movie/${id}/similar?language=pt-BR&page=1`,
				);
				setMovieSimilars(response.data.results);
			} catch (error) {
				console.error(error);
			}
		}
		fetchMovieSimilars();
	}, [id]);

	return (
		<div className="flex flex-col">
			{movie && <CardMovie {...movie} />}
			<strong className="mt-5 text-4xl">Filmes Similares</strong>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center my-4 gap-5">
				{movieSimilars?.map((movie) => (
					<CardMovies
						key={movie.id}
						id={movie.id}
						titulo={movie.title}
						dataPub={movie.release_date}
						urlImg={movie.poster_path}
						voteAverage={
							movie.vote_average ? Math.min(movie.vote_average, 10) / 2 : 0
						}
					/>
				))}
			</div>
		</div>
	);
}
