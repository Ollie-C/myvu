import { builder } from "../pothos";

builder.prismaObject("MyMovie", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    score: t.exposeFloat("score", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    date: t.exposeString("date", { nullable: true }),
    tmdbID: t.exposeInt("tmdbID", { nullable: true }),
    users: t.relation("users"),
  }),
});
