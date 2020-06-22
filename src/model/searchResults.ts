export interface SearchResult {
    request_hash: string;
    request_cached: boolean;
    request_cache_expiry: number;
    results: ResultsList[];
    last_page: number;
}

export interface ResultsList {
    mal_id: number;
    url: string;
    image_url: string;
    title: string;
    airing: boolean;
    synopsis: string;
    type: string;
    episodes: number;
    score: number;
    start_date: string;
    end_date: string;
    members: number;
    rated: string;
}

