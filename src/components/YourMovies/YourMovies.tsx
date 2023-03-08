import { MyMovie } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./YourMovies.module.scss";

type Props = {
  movies: MyMovie[];
  deleteMyMovie: (movie: MyMovie) => void;
};

const YourMovies: React.FC<Props> = ({ movies, deleteMyMovie }) => {
  const [selectedMyMovie, setSelectedMyMovie] = useState<MyMovie | null>(null);

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
            onClick={() =>
              !selectedMyMovie
                ? setSelectedMyMovie(movie)
                : setSelectedMyMovie(null)
            }
          />
        ))}
      </div>
      {selectedMyMovie && (
        <button onClick={() => deleteMyMovie(selectedMyMovie)}>X</button>
      )}
    </div>
  );
};

export default YourMovies;
