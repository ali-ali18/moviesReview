import CardMovie from "@/components/cardMovie";
import type { MovieProps } from "@/interfaces/movieProps"; 
import CardMovies from "@/components/cardMovies";
import type { Movie } from "@/schemas/movieSchema";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Movie() {
	const { id } = useParams();
	const [movie, setMovie] = useState<MovieProps>();
	const [movieSimilars, setMovieSimilars] = useState<Movie[]>();

	useEffect(() => {
		async function fetchMovie() {
			try {
				const response = await api.get(`/movie/${id}?language=pt-BR`);
				setMovie(response.data);
			} catch (error) {
				console.error(error);
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
