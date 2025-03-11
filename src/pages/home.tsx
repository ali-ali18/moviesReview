import CarouselCards from "@/components/carouselCards";
import ComponentLoading from "@/components/componentLoading";
import { Input } from "@/components/ui/input";
import { ContextMovies } from "@/context/contextMovies";
import { SearchMovieContext } from "@/context/contextSearchMovie";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const { moviesPopular, moviesNowPlaying, moviesTopRated } = useContext(ContextMovies);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const [query, setQuery] = useState<string>("");
	const {searchMovie} = useContext(SearchMovieContext);


	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (query) {
			await searchMovie(query);
			navigate('/movies/results');			
			setQuery('');
		}
	}

	function Loading () {
		const timer = setTimeout(() => {
			setLoading(false);
			clearTimeout(timer);
			return () => clearTimeout(timer);
		}, 2000);
	}

	Loading();

	if (loading) {
		return ( <ComponentLoading />);
	}
	
	return (
		<div>
			<div className="flex justify-between flex-col md:flex-row items-center">
				<h2 className="text-2xl font-medium flex-1 gap-3">
					Explore os melhores filmes
				</h2>
				<form onSubmit={handleSubmit} className="flex w-full justify-center md:justify-end flex-1 gap-2">
					<Input
						placeholder="Pesquise por filmes, séries..."
						type="search"
						className="w-full md:w-[300px] max-w-full"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
				</form>
			</div>

			<div className="w-full h-full flex flex-col gap-4">
				<strong className="text-2xl">Filmes Populares</strong>
				<div className="w-full flex">
				<CarouselCards setter={moviesPopular} />
				</div>

				<strong className="text-2xl">Lançamentos</strong>
				<div>
					<CarouselCards setter={moviesNowPlaying} />
				</div>

				<strong className="text-2xl">Melhores avaliações</strong>
				<div>
					<CarouselCards setter={moviesTopRated} />
				</div>
			</div>
		</div>
	);
}
