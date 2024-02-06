/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import MoviesSection from "src/components/MoviesSection";
import { useFetchMovies } from "src/hooks/useFetchMovies";

import {
  fetchComicsMovies,
  selectComicsMovies,
  setComicsCurrentPage,
} from "src/redux/slices/moviesComicsSlice";
import {
  fetchMoviesFamily,
  selectFamilyMovies,
  setFamilyCurrentPage,
} from "src/redux/slices/moviesFamilySlice";

import {
  fetchMovie,
  selectMoviesNewReleases,
  setPage,
  setReleasesCurrentPage,
} from "src/redux/slices/moviesNewReleasesSlice";
import {
  moviesTopBest,
  selectMoviesTopBest,
  setBestCurrentPage,
} from "src/redux/slices/moviesTopBestSlice";
import {
  moviesTopPopular,
  selectTopMovies,
  setCurrentPage,
} from "src/redux/slices/moviesTopPopularSlice";
import {
  fetchSearchMovies,
  selectSearchValue,
  setSearchCurrentPage,
} from "src/redux/slices/searchMovieSlice";

import { useAppDispatch } from "src/redux/store";
import { filterMovies } from "src/utils/filterMovies";
import { handleSetCurrentPage } from "src/utils/handleSetCurrentPage";

const Home: FC = () => {
  const {
    searchValue,
    searchMovies,
    searchStatus,
    searchPage,
    searchCurrentPage,
    searchFirstNewMovieIndex,
  } = useSelector(selectSearchValue);

  const {
    newReleasesCurrentPage,
    newReleasesMovies,
    newReleasesPages,
    newReleasesTotal,
    newReleasesStatus,
    newReleasesFirstMovieIndex,
  } = useSelector(selectMoviesNewReleases);
  const {
    topPopularMovies,
    topPopularStatus,
    topPopularPage,
    topPopularCurrentPage,
    topPopularFirstNewMovieIndex,
  } = useSelector(selectTopMovies);
  const {
    bestMovies,
    bestStatus,
    bestPage,
    bestCurrentPage,
    bestFirstNewMovieIndex,
  } = useSelector(selectMoviesTopBest);
  const {
    familyMovies,
    familyPage,
    familyStatus,
    familyCurrentPage,
    familyFirstNewMovieIndex,
  } = useSelector(selectFamilyMovies);
  const {
    comicsMovies,
    comicsPage,
    comicsStatus,
    comicsCurrentPage,
    comicsFirstNewMovieIndex,
  } = useSelector(selectComicsMovies);
  const dispatch = useAppDispatch();
  const [buttonClickedNewReleases, setButtonClickedNewReleases] =
    useState(false);
  const [buttonClickedTopMovies, setButtonClickedTopMovies] = useState(false);
  const [buttonClickedBestMovies, setButtonClickedBestMovies] = useState(false);
  const [buttonClickedFamily, setButtonClickedFamily] = useState(false);
  const [buttonClickedComics, setButtonClickedComics] = useState(false);
  const [buttonClickedSearchMovies, setButtonClickedSearchMovies] =
    useState(false);

  useFetchMovies(dispatch, fetchMovie, newReleasesCurrentPage);
  useFetchMovies(dispatch, moviesTopPopular, topPopularCurrentPage);
  useFetchMovies(dispatch, moviesTopBest, bestCurrentPage);
  useFetchMovies(dispatch, fetchMoviesFamily, familyCurrentPage);
  useFetchMovies(dispatch, fetchComicsMovies, comicsCurrentPage);

  useEffect(() => {
    async function fetchSearch() {
      if (searchValue) {
        const page = searchValue ? `&page=${searchCurrentPage}` : "";
        const search = `search-by-keyword?keyword=${searchValue}${page}`;

        dispatch(fetchSearchMovies({ search }));
      }
    }
    fetchSearch();
  }, [searchValue, searchCurrentPage, dispatch]);

  useEffect(() => {
    const numberOfPages = Math.ceil(newReleasesTotal / 10);
    dispatch(setPage(numberOfPages));
  }, [newReleasesTotal]);

  const filteredSearchMovies = useMemo(() => {
    return filterMovies(searchMovies);
  }, [searchMovies]);
  const filteredMovies = useMemo(() => {
    return filterMovies(newReleasesMovies);
  }, [newReleasesMovies]);
  const filteredTopMovies = useMemo(() => {
    return filterMovies(topPopularMovies);
  }, [topPopularMovies]);
  const filteredBestMovies = useMemo(() => {
    return filterMovies(bestMovies);
  }, [bestMovies]);
  const filteredMoviesFamily = useMemo(() => {
    return filterMovies(familyMovies);
  }, [familyMovies]);
  const filteredComicsMovies = useMemo(() => {
    return filterMovies(comicsMovies);
  }, [comicsMovies]);

  const handleSetSearchCurrentPage = useCallback(
    (currentPage: number) =>
      handleSetCurrentPage(
        currentPage,
        dispatch,
        setSearchCurrentPage,
        setButtonClickedSearchMovies
      ),
    []
  );

  const handleSetReleasesCurrentPage = useCallback(
    (currentPage: number) =>
      handleSetCurrentPage(
        currentPage,
        dispatch,
        setReleasesCurrentPage,
        setButtonClickedNewReleases
      ),
    []
  );

  const handleSetTopMoviesCurrentPage = useCallback(
    (currentPage: number) =>
      handleSetCurrentPage(
        currentPage,
        dispatch,
        setCurrentPage,
        setButtonClickedTopMovies
      ),
    []
  );

  const handleSetCurrentPageBestMovies = useCallback(
    (currentPage: number) =>
      handleSetCurrentPage(
        currentPage,
        dispatch,
        setBestCurrentPage,
        setButtonClickedBestMovies
      ),
    []
  );
  const handleSetCurrentPageFamily = useCallback(
    (currentPage: number) =>
      handleSetCurrentPage(
        currentPage,
        dispatch,
        setFamilyCurrentPage,
        setButtonClickedFamily
      ),
    []
  );
  const handleSetCurrentPageComics = useCallback(
    (currentPage: number) =>
      handleSetCurrentPage(
        currentPage,
        dispatch,
        setComicsCurrentPage,
        setButtonClickedComics
      ),
    []
  );

  return (
    <>
      {searchValue ? (
        <MoviesSection
          title={searchValue ? `Результаты поиска "${searchValue}"` : ""}
          movies={filteredSearchMovies}
          pages={searchPage}
          status={searchStatus}
          firstNewMovieIndex={searchFirstNewMovieIndex}
          currentPage={searchCurrentPage}
          setCurrentPage={handleSetSearchCurrentPage}
          button={buttonClickedSearchMovies}
          searchValue={searchValue}
        />
      ) : (
        <>
          <MoviesSection
            title="Новинки"
            movies={filteredMovies}
            pages={newReleasesPages}
            status={newReleasesStatus}
            firstNewMovieIndex={newReleasesFirstMovieIndex}
            currentPage={newReleasesCurrentPage}
            setCurrentPage={handleSetReleasesCurrentPage}
            button={buttonClickedNewReleases}
          />
          <MoviesSection
            title="Популярные"
            movies={filteredTopMovies}
            pages={topPopularPage}
            status={topPopularStatus}
            firstNewMovieIndex={topPopularFirstNewMovieIndex}
            currentPage={topPopularCurrentPage}
            setCurrentPage={handleSetTopMoviesCurrentPage}
            button={buttonClickedTopMovies}
          />
          <MoviesSection
            title="Лучшие"
            movies={filteredBestMovies}
            pages={bestPage}
            status={bestStatus}
            firstNewMovieIndex={bestFirstNewMovieIndex}
            currentPage={bestCurrentPage}
            setCurrentPage={handleSetCurrentPageBestMovies}
            button={buttonClickedBestMovies}
          />
          <MoviesSection
            title="Семейные"
            movies={filteredMoviesFamily}
            pages={familyPage}
            status={familyStatus}
            firstNewMovieIndex={familyFirstNewMovieIndex}
            currentPage={familyCurrentPage}
            setCurrentPage={handleSetCurrentPageFamily}
            button={buttonClickedFamily}
          />
          <MoviesSection
            title="Комиксы"
            movies={filteredComicsMovies}
            pages={comicsPage}
            status={comicsStatus}
            firstNewMovieIndex={comicsFirstNewMovieIndex}
            currentPage={comicsCurrentPage}
            setCurrentPage={handleSetCurrentPageComics}
            button={buttonClickedComics}
          />
        </>
      )}
    </>
  );
};

export default Home;
