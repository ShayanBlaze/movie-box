export interface ContentItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  media_type?: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  cast_id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface DetailItem extends ContentItem {
  tagline?: string;
  genres: Genre[];
  runtime?: number;
  number_of_seasons?: number;
  number_of_episodes?: number;
  status: string;
  credits: {
    cast: CastMember[];
  };
}
