/*
  Warnings:

  - The primary key for the `Images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `filetId` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `imageName` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Images" DROP CONSTRAINT "Images_pkey",
DROP COLUMN "filetId",
ADD COLUMN     "fileId" SERIAL NOT NULL,
ADD CONSTRAINT "Images_pkey" PRIMARY KEY ("fileId");

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "imageName",
DROP COLUMN "imageUrl";
