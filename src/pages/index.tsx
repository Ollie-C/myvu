import { NextPage } from "next";
import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import type { Movie } from "@prisma/client";

const getMoviesQuery = gql`
  query {
    movies {
      id
      name
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(getMoviesQuery);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <Head>
        <title>myvu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <h2>welcome to myvu</h2>
        <h3>Your movies:</h3>
        {data.movies.map((movie: Movie) => (
          <p key={movie.id}>{movie.name}</p>
        ))}
      </main>
    </>
  );
};

export default Home;
