export interface IImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface ITrailer {
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

export interface IBroadcast {
  day: string;
  time: string;
  timezone: string;
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
  openings: string[];
  endings: string[];
}

export interface IRelationEntry {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface IRelation {
  relation: string;
  entry: IRelationEntry[];
}

export interface IExternal {
  name: string;
  url: string;
}

export interface IStreaming {
  name: string;
  url: string;
}

export interface IData {
  mal_id: number;
  url: string;
  images: {
    jpg: IImage;
    webp: IImage;
  };
  trailer: ITrailer;
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
  background: null;
  season: string;
  year: number;
  broadcast: IBroadcast;
  producers: IProducer[];
  licensors: ILicensor[];
  studios: IStudio[];
  genres: IGenre[];
  explicit_genres: any[];
  themes: ITheme[];
  demographics: IGenre[];
  relations: IRelation[];
  theme: ITheme;
  external: IExternal[];
  streaming: IStreaming[];
}

export interface IAnime {
  data: IData;
}
