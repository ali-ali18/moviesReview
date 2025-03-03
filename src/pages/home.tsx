import CardMovies from "@/components/cardMovies";
import ComponentLoading from "@/components/componentLoading";
import { Input } from "@/components/ui/input";
import { ContextMovies } from "@/context/contextMovies";
import { useContext, useState } from "react";

export default function Home() {
	const { moviesPopular, moviesNowPlaying, moviesTopRated } = useContext(ContextMovies);
	const [loading, setLoading] = useState(true);

	function Loading () {
		const timer = setTimeout(() => {
			setLoading(false);
			clearTimeout(timer);
			return () => clearTimeout(timer);
		}, 2500);
	}

	Loading();

	if (loading) {
		return ( <ComponentLoading />);
	}
	
	return (
		<div>
			<div className="flex justify-between flex-col md:flex-row items-center">
				<h2 className="text-2xl font-medium flex-1 gap-3">
					Explorar Filmes e Séries
				</h2>
				<form className="flex w-full justify-center md:justify-end flex-1 gap-2">
					<Input
						placeholder="Pesquise por filmes, séries..."
						type="search"
						className="w-full md:w-[300px] max-w-full"
					/>
				</form>
			</div>

			<div className="w-full h-full">
				<strong className="text-2xl">Filmes Populares</strong>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center my-4 gap-5">
					{moviesPopular.map((movie) => (
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

				<strong className="text-2xl">Lançamentos</strong>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center my-4 gap-5">
					{moviesNowPlaying.map((movie) => (
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

				<strong className="text-2xl">Melhores avaliações</strong>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center my-4 gap-5">
					{moviesTopRated.map((movie) => (
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
		</div>
	);
}
