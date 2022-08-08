import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./request";
import "./Banner.css";
function Banner() {
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  const [movie, setMovie] = useState({});
  useEffect(() => {
    async function getData() {
      const response = await axios.get(requests.fetchTrending);
      const movies = response.data.results;

      setMovie(movies[Math.floor(Math.random() * movies.length - 1)]);
    }
    getData();
  }, []);
  return (
    <header
      className='banner'
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          ${BASE_URL}${movie?.backdrop_path}
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.original_title || movie?.title || movie.name}
        </h1>
        <button className='play__button'>Play</button>
        <button className='play__button'>My List</button>
        <div className='banner_description'>{movie?.overview}</div>
      </div>
      {/** Image */}
      {/** Title */}
      {/** Buttons */}
      {/** Description */}
      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;
