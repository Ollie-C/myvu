import { gql, useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import MovieResult from "../MovieResult/MovieResult";
import axios from "axios";
import styles from "./AddMovie.module.scss";

const AddMovieMutation = gql`
  mutation addMovie(
    $title: String!
    $image: String
    $date: String
    $tmdbID: Int
  ) {
    addMovie(title: $title, image: $image, date: $date, tmdbID: $tmdbID) {
      title
      image
      date
      tmdbID
    }
  }
`;

type Props = {
  refetch: () => void;
};

const AddMovie: React.FC<Props> = ({ refetch }) => {
  //Movie results state
  const [movies, setMovies] = useState([]);

  //Async call to get movies data from TMDB (temporary - replace with gql)
  const getMovies = async (query: String) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );
    setMovies(data.results.slice(0, 4));
  };

  const [searchedMovie, setSearchedMovie] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  //Add movie mutation hook
  const [addMovie, { loading: adding, error }] = useMutation(AddMovieMutation);

  //Form handler to update searched movie
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const movie = e.target.title.value;
    if (String(movie)) setSearchedMovie(movie);
  };

  const addUserMovie = async (selectedMovie: any) => {
    const {
      title,
      poster_path,
      release_date: date,
      id: tmdbID,
    } = selectedMovie;

    let image;
    if (poster_path) {
      image = `https://image.tmdb.org/t/p/w200${poster_path}`;
    }

    const variables = { title, image, date, tmdbID };

    try {
      await addMovie({ variables });
      refetch();
    } catch (e) {
      console.log(e);
    }
    setSelectedMovie(null);
  };

  useEffect(() => {
    if (searchedMovie) {
      getMovies(searchedMovie);
    }
  }, [searchedMovie]);

  return (
    <>
      <h4 className="section-title">ADD A MOVIE</h4>
      <form className={styles.addForm} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="title"
          id="title"
          value={searchedMovie}
          onChange={(e) => setSearchedMovie(e.target.value)}
        />
      </form>

      <div className={styles.searchResults}>
        {movies &&
          searchedMovie &&
          movies.map((movie: any) => (
            <MovieResult
              movie={movie}
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
            />
          ))}
      </div>
      {searchedMovie && selectedMovie && (
        <button
          className={styles.addButton}
          onClick={() => addUserMovie(selectedMovie)}
        >
          +
        </button>
      )}
    </>
  );
};

export default AddMovie;
