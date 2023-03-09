import { builder } from "../pothos";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: true }),
    email: t.exposeString("email"),
    myMovies: t.relation("myMovies", {
      //Update this later when allowing user to filter and sort
      query: () => ({
        orderBy: {
          score: "desc",
        },
      }),
    }),
  }),
});

//Get all users
builder.queryField("users", (t) =>
  t.prismaField({
    type: ["User"],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.user.findMany({
        ...query,
      }),
  })
);

//Get individual user
builder.queryField("user", (t) =>
  t.prismaField({
    type: "User",
    args: {
      email: t.arg.string({ required: true }),
    },
    nullable: true,
    resolve: async (query, _parent, args, _info) =>
      prisma.user.findUnique({
        where: {
          email: String(args.email),
        },
      }),
  })
);
