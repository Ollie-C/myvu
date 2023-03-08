import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import YourMovies from "@/components/YourMovies/YourMovies";
import MovieResult from "@/components/MovieResult/MovieResult";
import { MyMovie } from "@prisma/client";
import Layout from "@/components/Layout/Layout";

const userQuery = gql`
  query user($email: String!) {
    user(email: $email) {
      id
      name
      email
      myMovies {
        id
        title
        image
      }
    }
  }
`;
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

const DeleteMovieMutation = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

const Home: NextPage = () => {
  //Auth0 hook to check if user authenticated
  const { user } = useUser();

  //Get user query hook
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch,
  } = useQuery(userQuery, { variables: { email: user?.email } });

  //Add movie mutation hook
  const [addMovie, { loading: adding, error }] = useMutation(AddMovieMutation);

  //Delete movie mutation hook
  const [deleteMovie] = useMutation(DeleteMovieMutation);

  //Movies state and searched movie state
  const [movies, setMovies] = useState([]);
  const [searchedMovie, setSearchedMovie] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  //Async call to get movies data from TMDB (temporary - replace with gql)
  const getMovies = async (query: String) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );
    setMovies(data.results.slice(0, 8));
  };

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

  const deleteMyMovie = async (movie: MyMovie) => {
    try {
      await deleteMovie({ variables: { id: movie.id } });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (searchedMovie) {
      getMovies(searchedMovie);
    }
  }, [searchedMovie]);

  return (
    <>
      <Head>
        <title>myvu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <section className="profile">
          <h4 className="section-title">YOUR COLLECTION</h4>
          {user ? (
            <>
              <>
                {userLoading && <p>Loading...</p>}
                {userError && <p>{userError.message}</p>}
                {userData && (
                  <YourMovies
                    movies={userData.user.myMovies}
                    deleteMyMovie={deleteMyMovie}
                    adding={adding}
                  />
                )}
              </>
              <div className="account-cta">
                <a href="/api/auth/logout">LOGOUT</a>
              </div>
            </>
          ) : (
            <div className="account-cta">
              <a href="/api/auth/login">Login</a>
            </div>
          )}
        </section>
        <section className="search">
          <h4 className="section-title">ADD A MOVIE</h4>
          <form className="search__form" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              name="title"
              id="title"
              value={searchedMovie}
              onChange={(e) => setSearchedMovie(e.target.value)}
            />
            <button className="search__find" type="submit">
              FIND IT
            </button>
          </form>

          <div className="results">
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
          {selectedMovie && (
            <button
              className="search__add"
              onClick={() => addUserMovie(selectedMovie)}
            >
              +
            </button>
          )}
        </section>
      </Layout>
    </>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await getSession(req, res);

//   if (!session) {
//     return {
//       props: {},
//     };
//   }

//   const user = await prisma.user.findUnique({
//     select: {
//       email: true,
//       id: true,
//     },
//     where: {
//       email: session?.user.email,
//     },
//   });

//   return {
//     props: { user },
//   };
// };
