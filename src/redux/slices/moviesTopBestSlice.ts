import { createSlice } from "@reduxjs/toolkit";
import { moviesAPI } from "src/utils/apiUtils";
import { RootState } from "../store";
import { Status } from "src/types";
import { updateState } from "src/utils/updateState";
import { createFetchMoviesThunk } from "src/utils/fetchMoviesThunk";

const initialState = {
  bestMovies: [],
  bestTotal: 0,
  bestPage: 0,
  bestStatus: Status.Idle,
  bestCurrentPage: 1,
  bestFirstNewMovieIndex: -1,
};

export const moviesTopBest = createFetchMoviesThunk(
  "moviesTopBest",
  moviesAPI.getTopBest
);

export const moviesTopBestSlice = createSlice({
  name: "moviesTopBest",
  initialState,
  reducers: {
    setBestCurrentPage(state, action) {
      state.bestCurrentPage = action.payload;
    },
    setBestMoviesPage(state, action) {
      state.bestPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(moviesTopBest.pending, (state) => {
        state.bestStatus = Status.Pending;
      })
      .addCase(
        moviesTopBest.fulfilled,
        (state: RootState["moviesTopBest"], action) => {
          updateState(
            state,
            action,
            "bestMovies",
            "bestTotal",
            "items",
            "bestFirstNewMovieIndex"
          );
          state.bestStatus = Status.Fulfilled;
          state.bestPage = action.payload.totalPages;
        }
      )
      .addCase(moviesTopBest.rejected, (state) => {
        state.bestStatus = Status.Fulfilled;
      });
  },
});

export const { setBestCurrentPage, setBestMoviesPage } =
  moviesTopBestSlice.actions;
export const selectMoviesTopBest = (state: RootState) => state.moviesTopBest;

export default moviesTopBestSlice.reducer;
