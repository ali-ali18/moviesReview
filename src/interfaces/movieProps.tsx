type GenresProps = {
	id: number;
	name: string;
};

type ProductionCompaniesProps = {
	id: number;
	logo_path: string;
	name: string;
	origin_country: string;
};

type ProductionCountriesProps = {
	iso_3166_1: string;
	name: string;
};

type SpokenLanguagesProps = {
	english_name: string;
	iso_639_1: string;
	name: string;
};

export interface MovieProps {
	title: string;
	original_title: string;
	overview: string;
	poster_path: string;
	release_date: string;
	runtime: number;
	genres: GenresProps[];
	vote_average: number;
	vote_count: number;
	spoken_languages: SpokenLanguagesProps[];
	budget: number;
	revenue: number;
	production_companies: ProductionCompaniesProps[];
	production_countries: ProductionCountriesProps[];
}
