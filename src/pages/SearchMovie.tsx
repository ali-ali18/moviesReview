import CardMovies from "@/components/cardMovies";
import { Button } from "@/components/ui/button";
import { SearchMovieContext } from "@/context/contextSearchMovie";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function () {
	const { moviesSearch } = useContext(SearchMovieContext);
	return (
		<div>
			{moviesSearch.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
					{moviesSearch.map((movie) => (
						<CardMovies
							voteAverage={movie.vote_average ? Math.min(movie.vote_average, 10) / 2 : 0}
							dataPub={movie.release_date}
							id={movie.id}
							titulo={movie.title}
							urlImg={movie.poster_path}
							key={movie.id}
						/>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] w-full gap-2.5">
					<h2 className="text-2xl md:text-4xl font-medium text-center w-full md:w-10/12">
						Hmmmmmmmmmm, não foi possível encontrar nenhum filme com esse nome :(
					</h2>
					<Link to="/" className="mt-4">
						<Button variant={"outline"} size={"lg"} className="cursor-pointer">Retornar para o inicio</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
