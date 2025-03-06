import { Search } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { SearchMovieContext } from "@/context/contextSearchMovie";
import { useNavigate } from "react-router-dom";

export default function SheetNav() {
	const navigate = useNavigate();
	const { searchMovie } = useContext(SearchMovieContext);
	const [query, setQuery] = useState<string>('');

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if(query) {
			await searchMovie(query);
			navigate('/movies/results');
			setQuery('');
		}
	}

	return (
		<Sheet>
			<SheetTrigger className="flex gap-2.5 items-center border py-2 px-3.5 rounded-lg cursor-pointer hover:bg-muted transition-all duration-300">
				Pesquisar filmes <Search size={18} />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle className="text-2xl">Pesquisar</SheetTitle>
					<SheetDescription className="text-muted-foreground">
						Busque por filmes para adicionar aos seus favoritos
					</SheetDescription>
				</SheetHeader>
				<form className="p-4 pt-0" onSubmit={handleSubmit}>
					<Input
						placeholder="Pesquise por um filme..."
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<Button
						variant={"outline"}
						className="mt-3.5"
					>
						Pesquisar
					</Button>
				</form>
			</SheetContent>
		</Sheet>
	);
}
