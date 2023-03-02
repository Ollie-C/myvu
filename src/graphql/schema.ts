import { createSchema } from "graphql-yoga";
import prisma from "@/lib/prisma";

const schema = createSchema({
  typeDefs: `
  type Query {
    movies: [Movie]
  }
  
  type User {
    id: ID!
    email: String
    movies: [Movie]
  }
  
  type Movie {
    id: ID!
    name: String
  }
  `,
  resolvers: {
    Query: {
      movies: () => {
        return prisma.movie.findMany();
      },
    },
  },
});

export default schema;
