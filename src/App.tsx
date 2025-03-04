import { createBrowserRouter } from "react-router-dom";
import Layouts from "./layouts/layouts";
import Home from "./pages/home";
import MoviePage from "./pages/movie";

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
			}
		],
	},
]);

export default router;
