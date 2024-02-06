import { Movie } from "src/types";

export const filterMovies = (movies: Movie[]) => {
  return movies.filter((movie) => {
    const { nameRu } = movie;
    return nameRu;
  });
};
