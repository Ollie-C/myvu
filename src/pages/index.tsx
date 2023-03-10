import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
//Apollo Client
import { gql, useQuery, useMutation } from "@apollo/client";
//Auth0
import { useUser } from "@auth0/nextjs-auth0/client";
//Prisma Types
import { MyMovie } from "@prisma/client";
//Components
import Layout from "@/components/Layout/Layout";
import YourMovies from "@/components/YourMovies/YourMovies";
import AddMovie from "@/components/AddMovie/AddMovie";
//Design
import { RotateLoader } from "react-spinners";

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
        score
      }
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

  //Add vs Edit Mode
  const [mode, setMode] = useState<String>("add");

  //Get user query hook
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch,
  } = useQuery(userQuery, { variables: { email: user?.email } });

  //Delete movie mutation hook
  const [deleteMovie] = useMutation(DeleteMovieMutation);

  const deleteMyMovie = async (movie: MyMovie) => {
    try {
      await deleteMovie({ variables: { id: movie.id } });
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>myvu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <section className="collection">
          {userLoading && <RotateLoader />}
          {userError && <p>Create an account or login !</p>}
          {userData && (
            <YourMovies
              movies={userData.user.myMovies}
              deleteMyMovie={deleteMyMovie}
              // adding={adding}
              refetch={refetch}
            />
          )}
        </section>
        {mode !== "none" && (
          <section className="utility">
            {mode === "add" && <AddMovie refetch={refetch} />}
          </section>
        )}
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
