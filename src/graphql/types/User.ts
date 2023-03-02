import { builder } from "../pothos";

builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    email: t.exposeString("email", { nullable: true }),
    role: t.expose("role", { type: Role }),
    movies: t.relation("movies"),
  }),
});

const Role = builder.enumType("Role", {
  values: ["USER", "ADMIN"] as const,
});
