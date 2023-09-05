export interface IPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface IImageUrls {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface IVideoUrls {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
  };
}

export interface ITitle {
  type: string;
  title: string;
}

export interface IAired {
  from: string;
  to: string;
  prop: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number;
      month: number;
      year: number;
    };
  };
  string: string;
}

export interface IProducer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface ILicensor {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IStudio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface ITheme {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IDemographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IAnimeData {
  computedRank?: number;
  mal_id: number;
  url: string;
  images: {
    jpg: IImageUrls;
    webp: IImageUrls;
  };
  trailer: IVideoUrls;
  approved: boolean;
  titles: ITitle[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: IAired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: null | any;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: IProducer[];
  licensors: ILicensor[];
  studios: IStudio[];
  genres: IGenre[];
  explicit_genres: any[];
  themes: ITheme[];
  demographics: IDemographic[];
}

export interface IAnimeListResponse {
  pagination: IPagination;
  data: IAnimeData[];
}
