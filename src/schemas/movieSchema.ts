import { z } from "zod";

const FlatrateSchema = z.object({
	logo_path: z.string().nullable(),
	provider_id: z.number(),
	provider_name: z.string(),
	display_priority: z.number(),
});

const CountryProvidersSchema = z.object({
	link: z.string(),
	flatrate: z.array(FlatrateSchema).optional(),
	rent: z.array(FlatrateSchema).optional(),
	buy: z.array(FlatrateSchema).optional(),
});

const ProviderMoviesSchema = z.object({
	id: z.number(),
	results: z.record(z.string(), CountryProvidersSchema),
});

export const providerMovieValidetor = ProviderMoviesSchema;

export type FlatrateProps = z.infer<typeof FlatrateSchema>;
export type CountryProvidersProps = z.infer<typeof CountryProvidersSchema>;
export type ProviderMoviesProps = z.infer<typeof ProviderMoviesSchema>;


const GenresSchema = z.object({
	id: z.number(),
	name: z.string(),
})

const ProductionCompaniesSchema = z.object({
	id: z.number(),
	logo_path: z.string().nullable(),
	name: z.string(),
	origin_country: z.string(),
})

const ProductionCountriesSchema = z.object({
	iso_3166_1: z.string(),
	name: z.string(),
})


const SpokenLanguagesSchema = z.object({
	english_name: z.string(),
	iso_639_1: z.string(),
	name: z.string(),
})

const MovieSchema = z.object({
	title: z.string(),
	original_title: z.string(),
	overview: z.string().optional(),
	poster_path: z.string().nullable(),
	release_date: z.string(),
	runtime: z.number(),
	genres: z.array(GenresSchema),
	vote_average: z.number(),
	vote_count: z.number(),
	spoken_languages: z.array(SpokenLanguagesSchema),
	budget: z.number(),
	revenue: z.number(),
	production_companies: z.array(ProductionCompaniesSchema),
	production_countries: z.array(ProductionCountriesSchema),
})

export type MovieProps = z.infer<typeof MovieSchema>;
export const movieValidatedDados = MovieSchema;

