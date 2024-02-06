export type Movie = {
  // items?: any;
  filmId?: number;
  kinopoiskId?: number;
  nameRu?: string;
  nameEn?: string;
  year?: any;
  posterUrl?: string;
  genres?: { genre: string }[];
  rating?: number | null;
  ratingKinopoisk?: number | null;
  nameOriginal?: string;
  posterUrlPreview?: string;
  relationType?: string;
  ratingAgeLimits?: string;
  ratingImdb?: number | null;
  filmLength?: number;
  shortDescription?: string;
  coverUrl?: string;
  porterUrl?: string;
};

export type NewReleasesState = {
  newReleasesPages: number;
  newReleasesCurrentPage: number;
  newReleasesMovies: Movie[];
  newReleasesTotal: number;
  newReleasesStatus: string;
  newReleasesFirstMovieIndex: number;
};

export type TopPopularMoviesSlice = {
  topPopularStatus: string;
  topPopularMovies: Movie[];
  topPopularTotal: number;
  topPopularPage: number;
  topPopularCurrentPage: number;
  topPopularFirstNewMovieIndex: number;
};

export type SearchMoviesState = {
  searchValue: string;
  searchMovies: Movie[];
  searchStatus: Status;
  searchPage: number;
  searchTotal: number;
  searchCurrentPage: number;
  searchFirstNewMovieIndex: number;
};

export type FilterMoviesState = {
  filterMovies: Movie[];
};

export enum Status {
  Idle = "idle",
  Pending = "pending",
  Fulfilled = "fulfilled",
  Rejected = "rejected",
}

export type PropsFactsItems = {
  spoiler: boolean;
  text: string;
  type: string;
};
export type PropsFacts = {
  items: PropsFactsItems[];
  total: number;
};
