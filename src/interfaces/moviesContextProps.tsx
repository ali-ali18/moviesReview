

export type FlatrateProps = {
    logo_path: string
    provider_id: number
    provider_name: string
    display_priority: number
}

interface CountryProviders {
    link: string;
    flatrate?: FlatrateProps[];
    rent?: FlatrateProps[];
    buy?: FlatrateProps[];
  };


export interface ProviderMoviesProps {
    id: number;
    results: {
        [countryCode: string]: CountryProviders
    }
}