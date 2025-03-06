import { SearchMovieContext } from "@/context/contextSearchMovie";
import { useContext } from "react";

export default function () {
	const { moviesSearch } = useContext(SearchMovieContext); 
	return (
		<div>
			{moviesSearch.map((movie) => (
				<div key={movie.id}>{movie.title}</div>
			))}
		</div>
	);
}
