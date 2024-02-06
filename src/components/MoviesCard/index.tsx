import { FC } from "react";

import { Link, useLocation } from "react-router-dom";
import Rating from "./Rating";
import { Movie } from "src/types";
import { useAppDispatch } from "src/redux/store";
import {
  remoteFilterMovies,
  setFilterMovies,
} from "src/redux/slices/filterMoviesSlice";
import { useSnackbar } from "notistack";

const MoviesCard: FC<Movie> = ({
  nameRu,
  nameEn,
  year,
  posterUrl,
  genres,
  rating,
  ratingKinopoisk,
  filmId,
  kinopoiskId,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const showYear = (year: number | undefined) => {
    return year ? `${year}` : "";
  };
  const addToFavorites = () => {
    enqueueSnackbar("Добавлено в избранное", { variant: "default" });
    dispatch(
      setFilterMovies({
        filmId,
        kinopoiskId,
        nameRu,
        nameEn,
        year,
        posterUrl,
        rating,
        ratingKinopoisk,
      })
    );
  };
  const removeMovie = (filmId?: number, kinopoiskId?: number) => {
    dispatch(remoteFilterMovies(filmId || kinopoiskId));
  };
  return (
    <article className="h-[380px] w-[250px] relative text-center">
      <Link
        to={`/movie/${filmId || kinopoiskId}`}
        className=""
        aria-label={`${nameRu} ${nameEn} ${year} 
        ${genres?.map((genre) => genre.genre)}
        `}
      >
        <img
          src={posterUrl}
          className="w-full h-full rounded-lg"
          alt={`movies-img ${nameRu} ${showYear(year)}`}
          title={` ${nameRu} ${showYear(year)}`}
        />
      </Link>
      {location.pathname !== "/favorites" ? (
        <button
          onClick={addToFavorites}
          className="bg-transparent border-none cursor-pointer to-choase absolute top-[10px] right-[10px]"
        >
          <svg
            data-tooltip="Добавить в избранное"
            width="35px"
            height="35px"
            viewBox="0 0 52 52"
            data-name="Layer 1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M43.62,52a2,2,0,0,1-1.09-.33L26,40.83,9.47,51.67a2,2,0,0,1-2,.09,2,2,0,0,1-1-1.76V2a2,2,0,0,1,2-2H43.62a2,2,0,0,1,2,2V50a2,2,0,0,1-1,1.76A2,2,0,0,1,43.62,52ZM26,36.44a2.1,2.1,0,0,1,1.1.32L41.62,46.3V4H10.38V46.3L24.9,36.76A2.1,2.1,0,0,1,26,36.44Z" />
          </svg>
        </button>
      ) : (
        <button
          className={
            "hover:text-white text-[32px] bg-transparent border-none cursor-pointer to-choase absolute top-[10px] right-[10px]"
          }
          onClick={() => removeMovie(filmId, kinopoiskId)}
        >
          x
        </button>
      )}
      <Rating rating={ratingKinopoisk ?? rating ?? undefined} />
    </article>
  );
};

export default MoviesCard;
