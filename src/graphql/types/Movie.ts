import { builder } from "../pothos";

builder.prismaObject("Movie", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
  }),
});

builder.queryField("movies", (t) =>
  t.prismaField({
    type: ["Movie"],
    resolve: (query, _parents, _args, _ctx, _info) =>
      prisma.movie.findMany({ ...query }),
  })
);
