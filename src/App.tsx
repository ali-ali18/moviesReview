import { createBrowserRouter } from "react-router-dom";
import Layouts from "./layouts/layouts";
import Home from "./pages/home";
import MoviePage from "./pages/movie";
import SearchMovie from "./pages/SearchMovie";
import MoviesFavorites from "./pages/moviesFavoritos";
import AllMovies from "./pages/allMovies";

const router = createBrowserRouter([
	{
		element: <Layouts />,
		children: [
			{
				path: "/",
				element: <Home/>,
			},
			{
				path: '/movie/:id',
				element: <MoviePage />
			},
			{
				path: '/movies/results',
				element: <SearchMovie />
			},
			{
				path: '/moviesfavorites',
				element: <MoviesFavorites />
			},
			{
				path: '/movies/tendencias',
				element: <AllMovies/>
			}
		],
	},
]);

export default router;
