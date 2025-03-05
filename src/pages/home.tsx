import CarouselCards from "@/components/carouselCards";
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
