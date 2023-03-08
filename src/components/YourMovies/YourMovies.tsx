import { MyMovie } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./YourMovies.module.scss";
import { RotateLoader } from "react-spinners";

type Props = {
  movies: MyMovie[];
  deleteMyMovie: (movie: MyMovie) => void;
  adding: any;
};

const YourMovies: React.FC<Props> = ({ movies, deleteMyMovie, adding }) => {
  const [selectedMyMovie, setSelectedMyMovie] = useState<MyMovie | null>(null);

  if (movies.length === 0) {
    return <p>No movies yet!</p>;
  }

  if (adding)
    return (
      <div className={styles.yourmovies__loading}>
        <RotateLoader />
      </div>
    );

  return (
    <div className={styles.yourmovies}>
      <div className={styles.yourmovies__list}>
        {movies.map((movie: MyMovie, index: number) => (
          <div>
            <p className={styles.yourmovies__index}>{index + 1}</p>
            <Image
              src={movie.image}
              key={movie.id}
              className={styles.yourmovies__movie}
              alt={movie.title}
              width={100}
              height={120}
              onClick={() =>
                selectedMyMovie && selectedMyMovie.title === movie.title
                  ? setSelectedMyMovie(null)
                  : setSelectedMyMovie(movie)
              }
            />
          </div>
        ))}
      </div>
      {selectedMyMovie && (
        <button onClick={() => deleteMyMovie(selectedMyMovie)}>X</button>
      )}
    </div>
  );
};

export default YourMovies;
