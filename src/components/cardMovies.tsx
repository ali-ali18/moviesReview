import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface CardMoviesProps {
	id: number;
	titulo: string;
	dataPub: string;
	urlImg: string;
	voteAverage: number;
}

export default function CardMovies({
	id,
	titulo,
	dataPub,
	urlImg = "https://www.themoviedb.org/t/p/w1280/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
	voteAverage,
}: CardMoviesProps) {
	return (
		<Link
			to={`/movie/${id}`}
			className="relative rounded-md overflow-hidden shadow-lg w-[300px] h-[450px] max-w-full hover:scale-105 transition-all duration-300 ease-in-out"
		>
			<div>
				<img loading="lazy" src={`https://image.tmdb.org/t/p/original/${urlImg}`} alt={titulo} />
			</div>
			<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
				<h2 className="font-bold text-2xl text-white">{titulo}</h2>
				<p className="text-sm text-muted-foreground">{dataPub}</p>
			</div>
			<div className="absolute top-2 right-2 px-2 rounded-lg gap-1 flex items-center bg-black/40 text-white">
				<Star size={20} />
				<span> {voteAverage.toFixed(1)}/5 </span>
			</div>
		</Link>
	);
}
