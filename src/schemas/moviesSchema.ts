import { z } from "zod";

export const movieSchema = z.object({
	id: z.number().int().positive(),
	title: z.string().min(1, "O titulo deve ter pelo menos 1 caracter"),
	release_date: z.string().regex(/\d{4}-\d{2}-\d{2}/, "Data inválida"),
	poster_path: z
		.union([
			z.string().min(1, "A imagem deve ter pelo menos 1 caracter"),
			z.null(),
		])
		.transform((val) => (val === null ? "" : val)),
	vote_average: z.number().min(0).max(10),
});

export const movieArraySchema = z.array(movieSchema);

export type Movie = z.infer<typeof movieSchema>;
