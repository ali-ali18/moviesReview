import { Heart, Play } from "lucide-react";
import { Button } from "./ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useParams } from "react-router-dom";
import type { MovieProps } from "@/schemas/movieSchema";
import {
	providerMovieValidetor,
	type FlatrateProps,
} from "@/schemas/movieSchema";
import { z } from "zod";
import {
	formatBudget,
	formatDate,
	formatDuration,
	formatVote,
	formatVoteCount,
} from "@/utils/MovieFunctions";

export default function CardMovie({
	title,
	original_title,
	overview,
	poster_path,
	release_date,
	runtime,
	genres,
	vote_average,
	vote_count,
	spoken_languages,
	budget,
	revenue,
	production_companies,
	production_countries,
}: MovieProps) {
	const { id } = useParams();
	const [providerFilms, setProviderFilms] = useState<FlatrateProps[]>([]);

	useEffect(() => {
		async function fetchProviderFilms() {
			try {
				const response = await api.get(`/movie/${id}/watch/providers`);
				const validatedData = providerMovieValidetor.parse(response.data);
				const providerBR = validatedData.results?.BR?.flatrate || [];
				setProviderFilms(providerBR);
			} catch (error) {
				setProviderFilms([]);
				console.error(error);
				if (error instanceof z.ZodError) {
					console.error("Erro de validação:", error.errors);
				}
			}
		}
		fetchProviderFilms();
	}, [id]);

	const posterUrl = poster_path
		? `https://image.tmdb.org/t/p/original/${poster_path}`
		: "https://placehold.co/350x450?text=Capa+nao+Encontrada";

	return (
		<div>
			<div className="flex flex-row justify-center gap-12">
				<div>
					<img
						src={posterUrl}
						alt={title}
						className="w-[350px] h-[500px] min-w-[350px] min-h-[500px] rounded-md"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-1">
						<h1 className="text-5xl font-medium capitalize">{title}</h1>
						<strong className="text-xl text-muted-foreground font-medium mt-1">
							{original_title}
						</strong>
					</div>

					<div className="flex gap-2 text-lg">
						<span>
							<strong>Lançamento:</strong> {formatDate(release_date)}
						</span>
						<p>-</p>
						<span>
							<strong>Duração:</strong> {formatDuration(runtime)}
						</span>
					</div>

					<div className="flex gap-2 text-lg">
						<span className="flex gap-1 items-center">
							<strong>Média de avaliações:</strong> {formatVote(vote_average)}/5
						</span>
						<p>-</p>
						<span>
							<strong>Quantidade de avaliações:</strong>{" "}
							{formatVoteCount(vote_count)}
						</span>
					</div>

					<div className="flex flex-col">
						<p className="text-2xl font-bold">Gêneros</p>
						<div className="flex gap-2.5">
							<span className="text-lg">
								{genres.map((genre) => genre.name).join(", ")}
							</span>
						</div>
					</div>

					{providerFilms.length > 0 && (
						<div className="flex flex-col gap-1.5 my-4">
							<strong className="text-2xl">Disponivel em:</strong>
							<div className="flex gap-2">
								{providerFilms.map((provider) => (
									<img
										src={`https://image.tmdb.org/t/p/w300/${provider.logo_path}`}
										alt={provider.provider_name}
										key={provider.provider_id}
										className="w-12 h-12 rounded-md"
									/>
								))}
							</div>
						</div>
					)}

					<div className="flex flex-col gap-1 ">
						<h3 className="text-2xl font-bold">Sinopse</h3>
						<p className="w-[550px] max-w-full text-lg">
							{overview || "Não disponível"}
						</p>
						<div className="flex gap-2.5">
							<HoverCard>
								<HoverCardTrigger asChild>
									<Button
										variant={"outline"}
										className="cursor-pointer flex gap-1 items-center justify-center"
										asChild
									>
										<a
											target="__blank"
											href={`https://www.youtube.com/results?search_query=${title}+trailer`}
										>
											<Play />
										</a>
									</Button>
								</HoverCardTrigger>
								<HoverCardContent className="my-1.5">
									<Card className="p-1.5 rounded-sm">
										<p>Assistir ao trailer</p>
									</Card>
								</HoverCardContent>
							</HoverCard>
							<HoverCard>
								<HoverCardTrigger asChild>
									<Button
										variant={"outline"}
										className="cursor-pointer flex gap-1 items-center justify-center"
									>
										<Heart />
									</Button>
								</HoverCardTrigger>
								<HoverCardContent className="my-1.5">
									<Card className="p-1.5 rounded-sm">
										<p>Adicionar aos favoritos</p>
									</Card>
								</HoverCardContent>
							</HoverCard>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex flex-col">
						<strong>{spoken_languages.length > 1 ? "Idiomas" : "Idioma"}</strong>
						<span>
							{spoken_languages
								.map((language) => language.english_name)
								.join(", ")}
						</span>
					</div>

					<div className="flex flex-col">
						<strong>Orçamento:</strong>
						<span>{formatBudget(budget)}</span>
					</div>

					<div className="flex flex-col">
						<strong>Receita:</strong>
						<span>{formatBudget(revenue)}</span>
					</div>

					<div className="flex flex-col">
						<strong>{production_companies.length > 1 ? "Produtoras" : "Produtora"}</strong>
						<span>
							{production_companies.map((company) => company.name).join(", ")}
						</span>
					</div>

					<div className="flex flex-col">
						<strong>Produzido em:</strong>
						<span>
							{production_countries.map((company) => company.name).join(", ")}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
