import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Status } from "src/types";
import { moviesAPI } from "src/utils/apiUtils";
import { updateState } from "src/utils/updateState";
import { createFetchMoviesThunk } from "src/utils/fetchMoviesThunk";

const initialState = {
  familyMovies: [],
  familyTotal: 0,
  familyPage: 0,
  familyStatus: Status.Idle,
  familyCurrentPage: 1,
  familyFirstNewMovieIndex: -1,
};

export const fetchMoviesFamily = createFetchMoviesThunk(
  "moviesFamily",
  moviesAPI.getFamilyMovies
);

export const moviesFamilySlice = createSlice({
  name: "moviesFamily",
  initialState,
  reducers: {
    setFamilyPage: (state, action) => {
      state.familyPage = action.payload;
    },
    setFamilyCurrentPage: (state, action) => {
      state.familyCurrentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesFamily.pending, (state) => {
        state.familyStatus = Status.Pending;
      })
      .addCase(fetchMoviesFamily.fulfilled, (state, action) => {
        updateState(
          state,
          action,
          "familyMovies",
          "familyTotal",
          "items",
          "familyFirstNewMovieIndex"
        );
        state.familyStatus = Status.Fulfilled;
        state.familyPage = action.payload.totalPages;
      })
      .addCase(fetchMoviesFamily.rejected, (state) => {
        state.familyStatus = Status.Rejected;
      });
  },
});

export const { setFamilyPage, setFamilyCurrentPage } =
  moviesFamilySlice.actions;

export const selectFamilyMovies = (state: RootState) => state.moviesFamily;

export default moviesFamilySlice.reducer;
