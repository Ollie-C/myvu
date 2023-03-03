-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MyMovie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "tmdbID" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "MyMovie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MyMovie" ADD CONSTRAINT "MyMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
