import { createSchema } from "graphql-yoga";

const schema = createSchema({
  typeDefs: `
  type Query {
    user(id: ID!): User
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
      user: () => "Eyyy",
    },
  },
});

export default schema;
