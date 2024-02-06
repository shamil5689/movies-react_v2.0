import { FC, useEffect, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MoviesCard from "../MoviesCard";
import Skeleton from "../MoviesCard/Skeleton";
import { Status, Movie } from "src/types";
import SwiperContainer from "../SwiperContainer";

type PropsMoviestype = {
  title: string;
  movies: Movie[];
  pages: number;
  status: string;
  firstNewMovieIndex: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  button: boolean;
  searchValue?: string;
};

const MoviesSection: FC<PropsMoviestype> = ({
  title,
  movies,
  pages,
  status,
  firstNewMovieIndex,
  currentPage,
  setCurrentPage,
  button,
  searchValue,
}) => {
  const swiperRef = useRef<SwiperCore>(null);

  useEffect(() => {
    if (button && swiperRef.current && movies !== undefined) {
      if (firstNewMovieIndex !== null) {
        swiperRef.current.slideTo(firstNewMovieIndex);
      }
    }
  }, [movies, firstNewMovieIndex, button, swiperRef, searchValue]);

  const handleNextPage = () => {
    if (currentPage <= pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderMovieCards = () => {
    if (status === Status.Pending) {
      return [...new Array(10)].map((_, index) => (
        <SwiperSlide key={index}>
          <Skeleton key={index} />
        </SwiperSlide>
      ));
    }

    return movies.map((movie, index) => (
      <SwiperSlide key={`${movie.filmId}-${index}`}>
        <MoviesCard key={`${movie.filmId}-${index}`} {...movie} />
      </SwiperSlide>
    ));
  };

  return (
    <section className="mb-10">
      <h2 className="heading text-gray-300">{title}</h2>
      <SwiperContainer swiperRef={swiperRef}>
        {renderMovieCards()}
        {currentPage !== pages && pages > 1 && (
          <SwiperSlide>
            <button
              onClick={handleNextPage}
              className="cursor-pointer w-full h-[380px] border-none bg-transparent text-white"
            >
              {"Еще"}
            </button>
          </SwiperSlide>
        )}
      </SwiperContainer>
    </section>
  );
};

export default MoviesSection;
