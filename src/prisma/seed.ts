import { PrismaClient } from "@prisma/client";
import { myMovies } from "../data/movies";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "bobbobbbbbb@bob.com" },
    update: {},
    create: {
      name: "Ollie",
      email: "bobbobbbbbb@bob.com",
    },
  });

  await prisma.myMovie.createMany({
    data: myMovies,
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
