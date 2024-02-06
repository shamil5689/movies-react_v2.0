import { Movie } from "src/types";

type payloadType = {
  [key: string]: Movie[];
};
type actionType = {
  type: string;
  payload: payloadType;
  meta: {};
};
//updateState используется для moviesTopPopularSlise, moviesTopBestSlice, moviesFamilySlice, moviesComicsSlice
export const updateState = (
  state: any,
  action: actionType,
  property: string,
  totalProperty: string,
  itemsProperty: string,
  firstNewMovieIndex: string
) => {
  const newMovies = action.payload[itemsProperty];
  const existingMovies = state[property];
  const uniqueMovies = [];
  for (const newMovie of newMovies) {
    if (
      !existingMovies.some((movie: Movie) =>
        itemsProperty === "films"
          ? movie.filmId === newMovie.filmId
          : movie.kinopoiskId === newMovie.kinopoiskId
      )
    ) {
      uniqueMovies.push(newMovie);
    }
  }
  state[property] = [...existingMovies, ...uniqueMovies];
  state[totalProperty] = action.payload.total;
  if (uniqueMovies.length > 0) {
    state[firstNewMovieIndex] = state[property].length - uniqueMovies.length;
  }
};
