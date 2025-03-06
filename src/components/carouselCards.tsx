import CardMovies from "./cardMovies";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./ui/carousel";

type SetterArray = {
	id: number;
	title: string;
	release_date: string;
	poster_path: string;
	vote_average: number;
};
interface Setter {
	setter: SetterArray[];
}

export default function CarouselCards({ setter }: Setter) {
	return (
		<Carousel className="w-full max-w-full" opts={{ dragFree: true,  }}>
			<CarouselContent className="w-[300px] sm:w-full">
				{setter.map((movie) => (
					<CarouselItem
						className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
						key={movie.id}
					>
						<div className="rounded-md overflow-hidden max-w-full hover:opacity-80 transition-opacity duration-400">
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
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<div className="hidden xl:flex">
				<CarouselPrevious size={"icon"} />
				<CarouselNext size={"icon"}  />
			</div>
		</Carousel>
	);
}
