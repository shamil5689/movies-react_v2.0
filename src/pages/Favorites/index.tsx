import React, { FC, useRef } from "react";
import { useSelector } from "react-redux";
import MoviesCard from "src/components/MoviesCard";
import { selectFilterMovies } from "src/redux/slices/filterMoviesSlice";

import { SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperContainer from "src/components/SwiperContainer";
import { Movie } from "src/types";
import { EmptyFavorites } from "src/components/EmptyFavorites";

const Favorites: FC = () => {
  const { filterMovies } = useSelector(selectFilterMovies);

  const swiperRef = useRef<SwiperCore>(null);
  if (filterMovies.length === 0) return <EmptyFavorites />;
  return (
    <>
      <SwiperContainer swiperRef={swiperRef}>
        {filterMovies.map((movie: Movie) => (
          <SwiperSlide key={movie.filmId ?? movie.kinopoiskId}>
            <MoviesCard {...movie} key={movie.filmId ?? movie.kinopoiskId} />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </>
  );
};

export default Favorites;
