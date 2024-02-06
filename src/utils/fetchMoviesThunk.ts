import { createAsyncThunk } from "@reduxjs/toolkit";

export const createFetchMoviesThunk = (
  actionName: string,
  getMovies: Function
) => {
  return createAsyncThunk(
    `${actionName}/fetchMovies`,
    async (params: { page: string }) => {
      try {
        const { page } = params;
        const { data } = await getMovies(page);
        return data;
      } catch (error) {
        console.log(error, `error ${actionName}`);
      }
    }
  );
};
