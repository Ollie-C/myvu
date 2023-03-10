import React from "react";
import styles from "./MovieResult.module.scss";

const MovieResult = ({ movie, selectedMovie, setSelectedMovie }) => {
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
      <div className={styles.result__content}>
        <div className={styles.result__details}>
          <p>
            <b>{movie.title.toUpperCase()}</b>
          </p>
          <p>({movie.release_date.slice(0, 4)})</p>
        </div>
      </div>
    </div>
  );
};

export default MovieResult;
