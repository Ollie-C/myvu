import { MyMovie } from "@prisma/client";
import Image from "next/image";
import React from "react";
import styles from "./YourMovies.module.scss";

const YourMovies: React.FC<{ movies: MyMovie[] }> = ({ movies }) => {
  if (movies.length === 0) {
    return <p>No movies yet!</p>;
  }

  return (
    <div className={styles.yourmovies}>
      <div className={styles.yourmovies__list}>
        {movies.map((movie: MyMovie) => (
          <Image
            src={movie.image}
            key={movie.id}
            className={styles.yourmovies__movie}
            alt={movie.title}
            width={120}
            height={140}
          />
        ))}
      </div>
    </div>
  );
};

export default YourMovies;
