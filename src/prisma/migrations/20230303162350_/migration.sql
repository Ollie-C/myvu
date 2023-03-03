/*
  Warnings:

  - You are about to drop the `_MyMovieToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MyMovieToUser" DROP CONSTRAINT "_MyMovieToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MyMovieToUser" DROP CONSTRAINT "_MyMovieToUser_B_fkey";

-- AlterTable
ALTER TABLE "MyMovie" ADD COLUMN     "userId" INTEGER;

-- DropTable
DROP TABLE "_MyMovieToUser";

-- AddForeignKey
ALTER TABLE "MyMovie" ADD CONSTRAINT "MyMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
