import React, { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "src/utils/apiUtils";
import MoviesCard from "../MoviesCard";
import { Movie } from "src/types";
import { SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperContainer from "../SwiperContainer";

const SimilarMovies: FC = () => {
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState<{
    total: number;
    items: Movie[];
  }>({
    total: 0,
    items: [],
  });
  const swiperRef = useRef<SwiperCore>(null);
  useEffect(() => {
    async function getSimilarMovies() {
      try {
        const { data } = await moviesAPI.getSimilarsId(id as string);
        setSimilarMovies(data);
      } catch (error) {
        console.log(error, "errorSimilar");
      }
    }
    getSimilarMovies();
  }, [id]);
  return (
    <>
      {similarMovies?.total === 0 ? (
        false
      ) : (
        <section>
          <h2 className="heading">Похожие фильмы</h2>
          <SwiperContainer swiperRef={swiperRef}>
            {similarMovies?.items?.map((movie: Movie) => (
              <SwiperSlide key={movie.filmId}>
                <MoviesCard {...movie} key={movie.filmId} />
              </SwiperSlide>
            ))}
          </SwiperContainer>
        </section>
      )}
    </>
  );
};

export default SimilarMovies;
