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

builder.mutationField("addMyMovie", (t) =>
  t.prismaField({
    type: "MyMovie",
    args: {
      title: t.arg.string({ required: true }),

      image: t.arg.string({ required: true }),
      date: t.arg.string({ required: true }),
      tmdbID: t.arg.int({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { title, image, date, tmdbID } = args;

      //Check if user is logged in
      if (!(await ctx).user) {
        throw new Error("You have to be logged in.");
      }
      return prisma.myMovie.create({
        data: {
          title,
          image,
          date,
          tmdbID,
        },
      });
    },
  })
);
