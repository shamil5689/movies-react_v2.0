import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NewReleasesState, Status } from "src/types";
import { moviesAPI } from "src/utils/apiUtils";

const initialState: NewReleasesState = {
  newReleasesPages: 1,
  newReleasesCurrentPage: 1,
  newReleasesMovies: [],
  newReleasesTotal: 1,
  newReleasesStatus: Status.Idle,
  newReleasesFirstMovieIndex: -1,
};

// export const fetchMovie = createFetchMoviesThunk(
//   "moviesNewReleases",
//   moviesAPI.getMoviesReleases
// );

export const fetchMovie = createAsyncThunk(
  "movies/fetchMoviesReleases",

  async (params: { page: string }) => {
    try {
      const { page } = params;
      const { data } = await moviesAPI.getMoviesReleases(page);
      return data;
    } catch (error) {
      console.log(error, "moviesNewReleasesError");
    }
  }
);

export const moviesNewReleasesSlice = createSlice({
  name: "moviesNewReleases",
  initialState,
  reducers: {
    setPage(state, action) {
      state.newReleasesPages = action.payload;
    },
    setReleasesCurrentPage(state, action) {
      state.newReleasesCurrentPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.newReleasesStatus = Status.Pending;
      })
      .addCase(
        fetchMovie.fulfilled,
        (state: RootState["moviesNewReleases"], action) => {
          const newMovies = action.payload.releases.filter((newMovie: any) => {
            return !state.newReleasesMovies?.find(
              (existingMovie: any) => existingMovie.nameRu === newMovie.nameRu
            );
          });

          state.newReleasesMovies = [...state.newReleasesMovies, ...newMovies];
          state.newReleasesTotal = action.payload.total;
          state.newReleasesPages = action.payload.page;

          if (state.newReleasesMovies.length > 0) {
            state.newReleasesFirstMovieIndex =
              state.newReleasesFirstMovieIndex + action.payload.releases.length;
          }
          state.newReleasesStatus = Status.Fulfilled;
        }
      )
      .addCase(fetchMovie.rejected, (state) => {
        state.newReleasesStatus = Status.Rejected;
      });
  },
});

export const { setPage, setReleasesCurrentPage } =
  moviesNewReleasesSlice.actions;

export const selectMoviesNewReleases = (state: RootState) =>
  state.moviesNewReleases;

export default moviesNewReleasesSlice.reducer;
