/*
  Warnings:

  - Changed the type of `yearOfBirth` on the `Author` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "yearOfBirth",
ADD COLUMN     "yearOfBirth" INTEGER NOT NULL;
