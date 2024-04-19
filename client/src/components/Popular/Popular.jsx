/* eslint-disable import/no-unresolved */
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./popular.css";
import useFetch from "../../useFetch";
import Card from "../Card/Card";

export default function Popular({ status, uniqueTendances, shuffle }) {
  // URL des Movies et Series tendances
  const tendancesMoviesFetchURL =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";
  const tendancesSeriesFetchURL =
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=aea07ae608264c18c1ea1431604753c3";

  // Fetch de ces contenus via le Hook useFetch (20 de chaque)
  const {
    data: tendancesMovies,
    loading: loadingTendancesMovies,
    error: errorTendancesMovies,
  } = useFetch(tendancesMoviesFetchURL);
  const {
    data: tendancesSeries,
    loading: loadingTendancesSeries,
    error: errorTendancesSeries,
  } = useFetch(tendancesSeriesFetchURL);

  // Fonction permettant de mélanger 2 tableaux après les avoir concaténés
  const ShuffleConcat = (arr1, arr2) => {
    const final = shuffle(arr1.concat(arr2));
    return final;
  };

  // Fusion + mélange des tendances movies + series et limité à 15
  let allTendances = [];
  if (tendancesMovies && tendancesSeries) {
    allTendances = ShuffleConcat(tendancesMovies, tendancesSeries).slice(0, 15);
  }
  if (loadingTendancesMovies || loadingTendancesSeries) {
    return <h1>LOADING ...</h1>;
  }
  if (errorTendancesMovies || errorTendancesSeries) {
    console.info("Error");
  }

  return (
    <div className="slider-popular">
      <h1 className="main-title">POPULAR</h1>
      <div className="slider-container">
        <Swiper
          modules={[Navigation, FreeMode]}
          spaceBetween={5}
          slidesPerView={6}
          // eslint-disable-next-line react/jsx-boolean-value
          loop={true}
          // eslint-disable-next-line react/jsx-boolean-value
          freeMode={true}
          breakpoints={{
            1200: {
              slidesPerView: 6,
              spaceBetween: 5,
            },
            750: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            500: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            320: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            280: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
          }}
          navigation
          className="mySwiper"
        >
          <div>
            {status
              ? uniqueTendances?.map((content) => (
                  <SwiperSlide key={content.id}>
                    <Card card={content.poster_path} />
                  </SwiperSlide>
                ))
              : allTendances?.map((content) => (
                  <SwiperSlide key={content.id}>
                    <Card card={content} />
                  </SwiperSlide>
                ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
}

Popular.propTypes = {
  status: PropTypes.bool.isRequired,
  uniqueTendances: PropTypes.oneOfType([PropTypes.array.isRequired]).isRequired,
  shuffle: PropTypes.func.isRequired,
};
