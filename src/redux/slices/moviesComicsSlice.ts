import { Status } from "src/types";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { moviesAPI } from "src/utils/apiUtils";
import { updateState } from "src/utils/updateState";
import { createFetchMoviesThunk } from "src/utils/fetchMoviesThunk";

const initialState = {
  comicsMovies: [],
  comicsTotal: 0,
  comicsPage: 0,
  comicsStatus: Status.Idle,
  comicsCurrentPage: 1,
  comicsFirstNewMovieIndex: -1,
};

export const fetchComicsMovies = createFetchMoviesThunk(
  "moviesComics",
  moviesAPI.getComicsMovies
);

export const moviesComicsSlice = createSlice({
  name: "moviesComics",
  initialState,
  reducers: {
    setComicsCurrentPage: (state, action) => {
      state.comicsCurrentPage = action.payload;
    },
    setComicsPage: (state, action) => {
      state.comicsPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComicsMovies.pending, (state) => {
        state.comicsStatus = Status.Pending;
      })
      .addCase(
        fetchComicsMovies.fulfilled,
        (state: RootState["moviesComics"], action) => {
          updateState(
            state,
            action,
            "comicsMovies",
            "comicsTotal",
            "items",
            "comicsFirstNewMovieIndex"
          );
          state.comicsStatus = Status.Fulfilled;
          state.comicsPage = action.payload.totalPages;
        }
      )
      .addCase(fetchComicsMovies.rejected, (state) => {
        state.comicsStatus = Status.Rejected;
      });
  },
});

export const { setComicsPage, setComicsCurrentPage } =
  moviesComicsSlice.actions;

export const selectComicsMovies = (state: RootState) => state.moviesComics;

export default moviesComicsSlice.reducer;
