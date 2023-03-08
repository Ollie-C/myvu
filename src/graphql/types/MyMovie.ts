import { builder } from "../pothos";

builder.prismaObject("MyMovie", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    score: t.exposeFloat("score", { nullable: true }),
    image: t.exposeString("image", { nullable: true }),
    date: t.exposeString("date", { nullable: true }),
    tmdbID: t.exposeInt("tmdbID", { nullable: true }),
    user: t.relation("user"),
  }),
});

//Get all myMovies
builder.queryField("movieList", (t) =>
  t.prismaField({
    type: ["MyMovie"],
    resolve: async (query, _parent, _args, _info) =>
      prisma.myMovie.findMany({
        ...query,
      }),
  })
);

//Get individual myMovie
builder.queryField("movie", (t) =>
  t.prismaField({
    type: "MyMovie",
    args: {
      id: t.arg.id({ required: true }),
    },
    nullable: true,
    resolve: async (query, _parent, args, _info) =>
      prisma.myMovie.findUnique({
        ...query,
        where: {
          id: Number(args.id),
        },
      }),
  })
);

//Add movie
builder.mutationField("addMovie", (t) =>
  t.prismaField({
    type: "MyMovie",
    args: {
      title: t.arg.string({ required: true }),
      image: t.arg.string(),
      date: t.arg.string(),
      tmdbID: t.arg.int(),
      // userEmail: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { title, image, date, tmdbID } = args;

      //Check if user is logged in
      if (!(await ctx).user) {
        throw new Error("You have to be logged in.");
      }

      const userEmail = (await ctx).user?.email;

      return prisma.myMovie.create({
        data: {
          title,
          image,
          date,
          tmdbID,
          user: {
            connect: { email: userEmail },
          },
        },
      });
    },
  })
);

//Delete movie
builder.mutationField("deleteMovie", (t) =>
  t.prismaField({
    type: "MyMovie",
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (query, _parents, args, _info) =>
      prisma.myMovie.delete({
        ...query,
        where: {
          id: Number(args.id),
        },
      }),
  })
);
