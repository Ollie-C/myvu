import Image from "next/image";
import React from "react";
import styles from "./MovieResult.module.scss";

const MovieResult = ({ movie, selectedMovie, setSelectedMovie }) => {
  console.log(movie);
  return (
    <div
      className={styles.result}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
      }}
      key={movie.id}
      onClick={() =>
        !selectedMovie ? setSelectedMovie(movie) : setSelectedMovie(null)
      }
    >
      {/* <h3>{movie.title}</h3> */}
      {/* <p>Date: {movie.release_date}</p>
      <p>Score: {movie.vote_average}</p> */}
    </div>
  );
};

export default MovieResult;
