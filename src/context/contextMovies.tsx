import { fetchMovies } from "@/utils/moviesFunctions";
import { createContext, useEffect, useState } from "react";
import { movieArraySchema, Movie } from '@/schemas/movieSchema'
import { z } from "zod";

interface MoviePropsContext {
	moviesPopular: Movie[];
    moviesNowPlaying: Movie[];
    moviesTopRated: Movie[];
}   

export const ContextMovies = createContext({
	moviesPopular: [],
    moviesNowPlaying: [],
    moviesTopRated: [],
} as MoviePropsContext);

function ContextMoviesProvide({ children }: { children: React.ReactNode }) {
	const [moviesPopular, setMoviesPopular] = useState<Movie[]>([]);
	const [moviesNowPlaying, setMoviesNowPlaying] = useState<Movie[]>([]);
	const [moviesTopRated, setMoviesTopRated] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function LoadMovies() {
            try {
                const fetchMoviesPage = await fetchMovies({ limit: 8, typeCategoryMovie: "popular", page: 1 });
                const validationMovies = movieArraySchema.parse(fetchMoviesPage);
                setMoviesPopular(validationMovies);
            } catch (err) {
                if (err instanceof z.ZodError) {
                    setError(`Erro ao validar filmes populares: ${err.errors[0].message}`);
                  } else {
                    setError("Erro ao carregar filmes populares");
                  }
            }
        }
        LoadMovies();
	}, []);

    useEffect(() => {
        async function LoadMovies() {
            try {
                const fetchMoviesPage = await fetchMovies({ limit: 8, typeCategoryMovie: "now_playing", page: 1 });
                const validationMovies = movieArraySchema.parse(fetchMoviesPage);
                setMoviesNowPlaying(validationMovies);
            } catch (err) {
                if (err instanceof z.ZodError) {
                    setError(`Erro ao validar filmes em cartaz: ${err.errors[0].message}`);
                  } else {
                    setError("Erro ao carregar filmes em cartaz");
                  }
            }
        }
        LoadMovies();
    }, [])

    useEffect(() => {
        async function LoadMovies() {
            try {
                const fetchMoviesPage = await fetchMovies({ limit: 8, typeCategoryMovie: "top_rated", page: 1 });
                const validationMovies = movieArraySchema.parse(fetchMoviesPage);
                setMoviesTopRated(validationMovies);
            } catch (err) {
                if (err instanceof z.ZodError) {
                    setError(`Erro ao validar filmes em cartaz: ${err.errors[0].message}`);
                  } else {
                    setError("Erro ao carregar melhores avaliados");
                  }
            }
        }
        LoadMovies();
    }, [])

    if(error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        )
    }

	return (
		<ContextMovies.Provider value={{ moviesPopular, moviesNowPlaying, moviesTopRated,  }}>
			{children}
		</ContextMovies.Provider>
	);
}

export default ContextMoviesProvide;