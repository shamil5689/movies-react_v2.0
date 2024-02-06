import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SearchMoviesState, Status } from "src/types";
import { moviesAPI } from "src/utils/apiUtils";
import { RootState } from "../store";

const initialState: SearchMoviesState = {
  searchValue: "",
  searchMovies: [],
  searchStatus: Status.Idle,
  searchPage: 0,
  searchTotal: 0,
  searchCurrentPage: 1,
  searchFirstNewMovieIndex: -1,
};

export const fetchSearchMovies = createAsyncThunk(
  "searchMovie/fetchSearchMovies",
  async ({ search }: { search: string }) => {
    try {
      const { data } = await moviesAPI.getSearchMovies(search);
      return data;
    } catch (error) {
      console.log(error, "errorSearchMovies");
    }
  }
);

const searchMovieSlice = createSlice({
  initialState,
  name: "searchMovies",
  reducers: {
    setSearchValue(state, action) {
      state.searchCurrentPage = 1;
      state.searchValue = action.payload;
    },
    setSearchCurrentPage(state, action) {
      state.searchCurrentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSearchMovies.pending, (state) => {
      state.searchStatus = Status.Pending;
    });
    builder.addCase(
      fetchSearchMovies.fulfilled,
      (state: RootState["searchMovies"], action) => {
        state.searchMovies = [...action.payload.films];
        state.searchTotal = action.payload.searchFilmsCountResult;
        state.searchPage = action.payload.pagesCount;
        state.searchStatus = Status.Fulfilled;
      }
    );
    builder.addCase(fetchSearchMovies.rejected, (state) => {
      state.searchStatus = Status.Rejected;
    });
  },
});

export const { setSearchValue, setSearchCurrentPage } =
  searchMovieSlice.actions;

export const selectSearchValue = (state: RootState) => state.searchMovies;

export default searchMovieSlice.reducer;
