import CardMovies from "@/components/cardMovies";
import { ContextFavoritos } from "@/context/contextFavoritos";
import { useContext } from "react";

export default function MoviesFavorites() {
	const { favoritos } = useContext(ContextFavoritos);
	return (
		<div>
			{favoritos.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
					{favoritos.map((movie) => (
						<CardMovies
							voteAverage={
								movie.vote_average ? Math.min(movie.vote_average, 10) / 2 : 0
							}
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
						Você não adicionou nenhum filme aos favoritos :(
					</h2>
				</div>
			)}
		</div>
	);
}
