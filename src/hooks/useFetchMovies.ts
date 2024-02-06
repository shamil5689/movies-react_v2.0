/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSearchValue } from "src/redux/slices/searchMovieSlice";

export const useFetchMovies = (
  dispatch: Function,
  action: Function,
  page: number
) => {
  const { searchValue } = useSelector(selectSearchValue);
  useEffect(() => {
    if (!searchValue) {
      const pageParam = page ? `page=${page}` : "";
      dispatch(action({ page: pageParam }));
    }
  }, [page]);
};
