import { MyMovie } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./YourMovies.module.scss";
import { RotateLoader } from "react-spinners";
import { gql, useMutation } from "@apollo/client";

type Props = {
  movies: MyMovie[];
  deleteMyMovie: (movie: MyMovie) => void;
  adding: any;
  refetch: () => void;
};

const AddScoreMutation = gql`
  mutation addScore($id: ID!, $score: Float!) {
    addScore(id: $id, score: $score) {
      id
      score
    }
  }
`;

const YourMovies: React.FC<Props> = ({
  movies,
  deleteMyMovie,
  adding,
  refetch,
}) => {
  const [selectedMyMovie, setSelectedMyMovie] = useState<MyMovie | null>(null);

  const [addScore] = useMutation(AddScoreMutation);

  if (movies.length === 0) {
    return <p>No movies yet!</p>;
  }

  //Add a score to a movie
  const scoreMovie = async (e: any) => {
    e.preventDefault();
    try {
      await addScore({
        variables: {
          score: Number(e.target.score.value),
          id: selectedMyMovie?.id,
        },
      });
      setSelectedMyMovie(null);
      //To immediately put the ranked movie in the correct position
      refetch();
    } catch (e) {
      console.log(e);
    }
  };
  console.log(movies);

  return (
    <div className={styles.yourmovies}>
      <div className={styles.yourmovies__section}>
        <h4 className={styles.yourmovies__header}>TOP 16</h4>
        <div className={styles.yourmovies__list}>
          {movies.map(
            (movie: MyMovie) =>
              movie.score && (
                <div key={movie.id}>
                  <p className={styles.yourmovies__index}>{movie.score}</p>
                  <div className={styles.yourmovies__movieContainer}>
                    {movie.image && (
                      <Image
                        src={movie.image}
                        className={styles.yourmovies__movie}
                        alt={movie.title}
                        width={200}
                        height={230}
                        quality={100}
                        onClick={() =>
                          selectedMyMovie &&
                          selectedMyMovie.title === movie.title
                            ? setSelectedMyMovie(null)
                            : setSelectedMyMovie(movie)
                        }
                      />
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div className={styles.yourmovies__section}>
        <h4 className={styles.yourmovies__header}>
          THESE ARE AWAITING A SCORE!
        </h4>
        <div className={styles.yourmovies__list}>
          {adding && <RotateLoader />}
          {movies
            .map(
              (movie: MyMovie) =>
                !movie.score && (
                  <div key={movie.id}>
                    <div className={styles.yourmovies__movieContainer}>
                      {movie.image && (
                        <Image
                          src={movie.image}
                          className={styles.yourmovies__movie}
                          alt={movie.title}
                          width={200}
                          height={230}
                          quality={100}
                          onClick={() =>
                            selectedMyMovie &&
                            selectedMyMovie.title === movie.title
                              ? setSelectedMyMovie(null)
                              : setSelectedMyMovie(movie)
                          }
                        />
                      )}
                    </div>
                  </div>
                )
            )
            .slice(0, 7)}
        </div>
      </div>
      {selectedMyMovie && (
        <>
          <button
            className={styles.yourmovies__delete}
            onClick={() => deleteMyMovie(selectedMyMovie)}
          >
            X
          </button>

          <form onSubmit={(e) => scoreMovie(e)}>
            <input type="text" name="score" id="score" />
            <button className={styles.yourmovies__delete} type="submit">
              SCORE
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default YourMovies;
