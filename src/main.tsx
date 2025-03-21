import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import { ThemeProvider } from "./components/theme/themeProvider";
import ContextMoviesProvide from "./context/contextMovies";
import SearchProvider from "./context/contextSearchMovie";
import { ContextFavoritosProvider } from "./context/contextFavoritos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<QueryClientProvider client={queryClient}>
		<ThemeProvider defaultTheme="system" storageKey="themeMovie">
			<SearchProvider>
				<ContextMoviesProvide>
					<ContextFavoritosProvider>
						<RouterProvider router={router} />
					</ContextFavoritosProvider>
				</ContextMoviesProvide>
			</SearchProvider>
		</ThemeProvider>
	</QueryClientProvider>,
);
