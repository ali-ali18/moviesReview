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
	urlImg = "https://placehold.co/350x450?text=Capa+n%C3%A3o+Encontrada",
	voteAverage,
}: CardMoviesProps) {
	const isUrlValid = urlImg
		? `https://image.tmdb.org/t/p/original/${urlImg}`
		: "https://placehold.co/350x450?text=Capa+n%C3%A3o+Encontrada";

	return (
		<Link
			to={`/movie/${id}`}
			className="relative  rounded-lg overflow-hidden shadow-lg w-[350px] h-[450px] max-w-full"
		>
			<div>
				<img
				className="w-full h-[450px] max-w-full object-cover"
					loading="lazy"
					src={isUrlValid}
					alt={titulo}
				/>	
			</div>
			<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
				<h2 className="font-bold text-2xl text-white">{titulo}</h2>
				<p className="text-sm text-muted-foreground">{dataPub}</p>
			</div>
			<div className="absolute hidden top-2 right-2 px-2 rounded-lg gap-1 sm:flex items-center bg-black/40 text-white">
				<Star size={20} />
				<span> {voteAverage.toFixed(1)}/5 </span>
			</div>
		</Link>
	);
}
