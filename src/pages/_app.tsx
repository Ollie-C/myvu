import "../styles/main.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "@/lib/apollo";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}
