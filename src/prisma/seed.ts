// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import { movies } from "../data/movies";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "testt3st@gmail.com" },
    update: {},
    create: {
      name: "Ollie",
      role: "ADMIN",
      email: "testt3st@gmail.com",
    },
  });

  await prisma.movie.createMany({
    data: movies,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
