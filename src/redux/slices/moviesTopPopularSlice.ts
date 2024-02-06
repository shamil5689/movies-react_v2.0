import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { moviesAPI } from "src/utils/apiUtils";
import { Status, TopPopularMoviesSlice } from "src/types";
import { updateState } from "src/utils/updateState";
import { createFetchMoviesThunk } from "src/utils/fetchMoviesThunk";

const initialState: TopPopularMoviesSlice = {
  topPopularStatus: Status.Idle,
  topPopularMovies: [],
  topPopularTotal: 1,
  topPopularPage: 1,
  topPopularCurrentPage: 1,
  topPopularFirstNewMovieIndex: -1,
};

export const moviesTopPopular = createFetchMoviesThunk(
  "moviesTopPopular",
  moviesAPI.getTopPopular
);

export const moviesTopPopularSlice = createSlice({
  name: "moviesTopPopular",
  initialState,
  reducers: {
    setPage(state, action) {
      state.topPopularPage = action.payload;
    },
    setCurrentPage(state, action) {
      state.topPopularCurrentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(moviesTopPopular.pending, (state) => {
      state.topPopularStatus = Status.Pending;
    });
    builder.addCase(
      moviesTopPopular.fulfilled,
      (state: RootState["moviesTopPopular"], action) => {
        updateState(
          state,
          action,
          "topPopularMovies",
          "topPopularTotal",
          "items",
          "topPopularFirstNewMovieIndex"
        );
        state.topPopularStatus = Status.Fulfilled;
        state.topPopularPage = action.payload.totalPages;
      }
    );
    builder.addCase(moviesTopPopular.rejected, (state) => {
      state.topPopularStatus = Status.Rejected;
    });
  },
});

export const { setPage, setCurrentPage } = moviesTopPopularSlice.actions;

export const selectTopMovies = (state: RootState) => state.moviesTopPopular;

export default moviesTopPopularSlice.reducer;
