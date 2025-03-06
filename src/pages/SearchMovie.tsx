import { SearchMovieContext } from "@/context/contextSearchMovie";
import { useContext } from "react";
import { useParams } from "react-router-dom";

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
