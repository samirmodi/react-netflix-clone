import React, { useState, useEffect } from "react";
import axios_wrapper from "./axios";
import axios from "axios";
import "./Row.css";
import YouTube from "react-youtube";

const TRAILER_BASE_URL = "https://api.themoviedb.org/3/";
const BASE_URL = "https://image.tmdb.org/t/p/original";
const API_KEY = "e4fe3379ae56438deafa77110691010d";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState("");

  const showTrailer = async (obj) => {
    if (trailer) {
      setTrailer("");
    } else {
      let url = "";
      if ("video" in obj) {
        url = `${TRAILER_BASE_URL}movie/${obj.id}/videos?api_key=${API_KEY}`;
      } else {
        url = `${TRAILER_BASE_URL}tv/${obj.id}/videos?api_key=${API_KEY}`;
      }
      //get tv videos url , grab key of results array of 1st index
      //http://api.themoviedb.org/3/tv/112836/videos?api_key=e4fe3379ae56438deafa77110691010d
      const response = await axios.get(url);
      setTrailer(response.data?.results[0]?.key);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios_wrapper.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className='row'>
      <h2 className='row__title'>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <img
            onClick={() => showTrailer(movie)}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${BASE_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailer && <YouTube videoId={trailer} opts={opts} />}
    </div>
  );
}

export default Row;
