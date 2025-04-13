/*
  Warnings:

  - You are about to drop the column `imageName` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `category` table. All the data in the column will be lost.
  - Added the required column `imageName` to the `categoryItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePath` to the `categoryItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "imageName",
DROP COLUMN "imagePath";

-- AlterTable
ALTER TABLE "categoryItems" ADD COLUMN     "imageName" TEXT NOT NULL,
ADD COLUMN     "imagePath" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
