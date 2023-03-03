import { NextPage } from "next";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import type { MyMovie } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
const getUsersQuery = gql`
  query {
    getUser {
      id
      email
      role
      myMovies {
        title
      }
    }
  }
`;

const Home: NextPage = () => {
  //Auth0 hook to check if user authenticated
  const { user } = useUser();

  //Apollo hook to get user data (temporary)
  // const { data, loading, error } = useQuery(getUsersQuery);

  //Movies state and searched movie state
  const [movies, setMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState(null);

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

  useEffect(() => {
    if (searchedMovie) {
      getMovies(searchedMovie);
    }
  }, [searchedMovie]);

  // if (loading) return <p>Loading ...</p>;
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
              {/* <p>email: {data.getUser[0].email}</p>
              <p>account type: {data.getUser[0].role}</p>
              <h3>Your movies:</h3>
              {data.getUser[0].myMovies.map((movie: MyMovie) => (
                <p key={movie.id}>{movie.title}</p>
              ))} */}
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
            {movies &&
              movies.map((movie) => (
                <>
                  <h3>{movie.title}</h3>
                  <p>Date: {movie.release_date}</p>
                  <p>Score: {movie.vote_average}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  ></img>
                </>
              ))}
          </div>
        </>
      </main>
    </>
  );
};

export default Home;
