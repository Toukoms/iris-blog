/*
  Warnings:

  - You are about to drop the column `jsonContent` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `markdownContent` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "jsonContent",
DROP COLUMN "markdownContent",
ADD COLUMN     "content" TEXT;
