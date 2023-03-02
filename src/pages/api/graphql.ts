import { createYoga } from "graphql-yoga";
import schema from "../../graphql/schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
});
