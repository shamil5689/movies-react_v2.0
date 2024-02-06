import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { FilterMoviesState } from "src/types";

const initialState: FilterMoviesState = {
  filterMovies: [],
};

export const filterMoviesSlice = createSlice({
  initialState,
  name: "filterMovies",
  reducers: {
    setFilterMovies: (state, action) => {
      state.filterMovies = state.filterMovies.filter(
        (movie) =>
          movie.filmId !== action.payload.filmId ||
          movie.kinopoiskId !== action.payload.kinopoiskId
      );
      state.filterMovies.push({ ...action.payload });
    },
    remoteFilterMovies: (state, action) => {
      state.filterMovies = state.filterMovies.filter(
        (movie) =>
          movie.filmId !== action.payload &&
          movie.kinopoiskId !== action.payload
      );
    },
  },
});

export const { setFilterMovies, remoteFilterMovies } =
  filterMoviesSlice.actions;

export const selectFilterMovies = (state: RootState) => state.filterMovies;

export default filterMoviesSlice.reducer;
