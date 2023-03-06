import { NextPage } from "next";
import Head from "next/head";
import { gql, useQuery, useMutation } from "@apollo/client";
import type { MyMovie } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

// const getUsersQuery = gql`
//   query {
//     getUser {
//       id
//       email
//       role
//       myMovies {
//         title
//       }
//     }
//   }
// `;

const AddMyMovieMutation = gql`
  mutation addMyMovie(
    $title: String!
    $image: String!
    $date: String!
    $tmdbID: Int!
  ) {
    addMyMovie(title: $title, image: $image, date: $date, tmdbID: $tmdbID) {
      title
      image
      date
      tmdbID
    }
  }
`;

const Home: NextPage = () => {
  //Auth0 hook to check if user authenticated
  const { user } = useUser();

  // //Apollo hook to get user data (temporary)
  // const { data, loading, error } = useQuery(getUsersQuery);

  //Movies state and searched movie state
  const [movies, setMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState(null);

  const [addMyMovie, { loading, error }] = useMutation(AddMyMovieMutation);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //Async call to get movies data from TMDB (temporary - replace with gql)
  const getMovies = async (query: String) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );
    setMovies(data.results.slice(0, 8));
  };

  //Form handler to update searched movie
  const handleSumbit = (e: any) => {
    e.preventDefault();
    const movie = e.target.title.value;
    if (String(movie)) setSearchedMovie(movie);
  };

  const addMovie = async (selectedMovie: any) => {
    const {
      title,
      poster_path,
      release_date: date,
      id: tmdbID,
    } = selectedMovie;

    const image = `https://image.tmdb.org/t/p/w200${poster_path}`;
    const variables = { title, image, date, tmdbID };

    try {
      addMyMovie({ variables });
    } catch (e) {
      console.log(e);
    }
    console.log(variables);
  };

  useEffect(() => {
    if (searchedMovie) {
      getMovies(searchedMovie);
    }
  }, [searchedMovie]);

  useEffect(() => {
    console.log(selectedMovie);
  }, [selectedMovie]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  // // if (loading) return <p>Loading ...</p>;
  // if (error) return <p>{error.message}</p>;
  return (
    <>
      <Head>
        <title>myvu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <>
          <h2>welcome to myvu</h2>
          {user ? (
            <>
              <p>Logged in!</p>
              <a href="/api/auth/logout">Logout</a>
            </>
          ) : (
            <a href="/api/auth/login">Login</a>
          )}
        </>
        <>
          <form onSubmit={(e) => handleSumbit(e)}>
            <h3>Search for a movie:</h3>
            <input type="text" name="title" id="title" />
            <button type="submit">Submit</button>
          </form>
          <div className="results">
            <p>Results:</p>
            {selectedMovie && (
              <button onClick={() => addMovie(selectedMovie)}>
                Add Selected
              </button>
            )}
            {movies &&
              movies.map((movie: any) => (
                <div
                  key={movie.id}
                  onClick={() =>
                    !selectedMovie
                      ? setSelectedMovie(movie)
                      : setSelectedMovie(null)
                  }
                >
                  <h3>{movie.title}</h3>
                  <p>Date: {movie.release_date}</p>
                  <p>Score: {movie.vote_average}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  ></img>
                </div>
              ))}
          </div>
        </>
      </main>
    </>
  );
};

export default Home;
