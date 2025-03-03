import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import { ThemeProvider } from "./components/theme/themeProvider";
import ContextMoviesProvide from "./context/contextMovies";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider defaultTheme="system" storageKey="themeMovie">
			<ContextMoviesProvide>
				<RouterProvider router={router} />
			</ContextMoviesProvide>
		</ThemeProvider>
	</StrictMode>,
);
