/*
  Warnings:

  - You are about to drop the column `userId` on the `MyMovie` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MyMovie" DROP CONSTRAINT "MyMovie_userId_fkey";

-- AlterTable
ALTER TABLE "MyMovie" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_MyMovieToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MyMovieToUser_AB_unique" ON "_MyMovieToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MyMovieToUser_B_index" ON "_MyMovieToUser"("B");

-- AddForeignKey
ALTER TABLE "_MyMovieToUser" ADD CONSTRAINT "_MyMovieToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "MyMovie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MyMovieToUser" ADD CONSTRAINT "_MyMovieToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
