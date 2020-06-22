export interface Anime {
    request_hash: string;
    request_cached: boolean;
    request_cache_expiry: number;
    mal_id: number;
    url: string;
    image_url: string;
    trailer_url: string;
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string;
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: Aired;
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    premiered: string;
    broadcast: string;
    related: {
        Adaptation: Related[],
        Prequel: Related[]
    };
    producers: Related[];
    licensors: Related[];
    studios: Related[];
    genres: Related[];
    opening_themes: string[];
    ending_themes: string[];
}

interface Related {
    mal_id: string;
    type: string;
    name: string;
    url: string;
}

interface Aired {
    from: string;
    to: string;
    prop: Prop;
    string: string;
}

interface Prop {
    from: SubProp;
    to: SubProp;
}

interface SubProp {
    day: number;
    month: number;
    year: number;
}