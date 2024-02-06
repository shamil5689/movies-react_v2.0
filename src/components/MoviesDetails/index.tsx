import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { moviesAPI } from "src/utils/apiUtils";
import Rating from "../MoviesCard/Rating";
import InterestingFacts from "../InterestingFacts";
import SimilarMovies from "../SimilarMovies";
import { Movie } from "src/types";

const MoviesDetails: FC = () => {
  const [data, setData] = useState({} as Movie);
  const { id } = useParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const ratingAgeLimits = data.ratingAgeLimits?.replace(/\D/g, "");
  const ratingAgeLimitsWithPlus = ratingAgeLimits ? ratingAgeLimits + "+" : "";
  useEffect(() => {
    async function getMoviesData() {
      try {
        const { data } = await moviesAPI.getMoviesId(id as string);
        setData(data);
      } catch (error) {
        console.log(error, "MoviesDetailsError");
      }
    }
    getMoviesData();
  }, [id]);

  return (
    <>
      <section>
        <article className="overlay relative flex justify-between xl:h-[610px] h-[auto] text-white mb-10">
          <div className="max-[640px]:order-1  h-full z-50 text-customSizeText line-height-[26px]">
            <h1 className="heading mb-[16px]">{data.nameRu}</h1>
            <ul className=" flex information list-none p-0  mb-[16px]">
              <li className="relative">
                <Rating
                  rating={data.ratingKinopoisk ?? data.ratingImdb ?? undefined}
                />
              </li>
              <li>{data.year}</li>
              <li>
                {data.genres
                  ?.map((genre: { genre: string }) => genre.genre)
                  .slice(0, 2)
                  .join(", ")}
              </li>
              {data.filmLength && <li>{data.filmLength + "м"}</li>}
              <li>{ratingAgeLimitsWithPlus}</li>
            </ul>
            <p className="sm:max-w-[80%] text-justify max-w-full">
              {data.shortDescription}
            </p>
          </div>
          <div className="max-[640px]:top-[10%]  w-full h-full  relative overflow-hidden">
            <img
              src={data.coverUrl || data.posterUrl || data.posterUrlPreview}
              className="max-w-full h-full max-[1280px]:h-auto static opacity-70 xl:absolute right-0 z-0"
              alt=""
            />
          </div>
        </article>
      </section>
      <InterestingFacts />
      <iframe
        src={`https://11.annacdn.cc/cJhaBIzyVr2u?kp_id=${id}`}
        className="iframe w-full min-h-[500px] border-0 mb-10"
        ref={iframeRef}
        onLoad={() => {
          <div className="w-full text-white">iframe</div>;
        }}
        title="iframe"
      />
      <SimilarMovies />
      <script src="//kinoplayer.top/top.js"></script>
    </>
  );
};

export default MoviesDetails;
