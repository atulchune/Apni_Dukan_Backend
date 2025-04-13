/*
  Warnings:

  - You are about to drop the `categoryItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageName` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categoryItems" DROP CONSTRAINT "categoryItems_categoryId_fkey";

-- AlterTable
ALTER TABLE "category" ADD COLUMN     "imageName" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "categoryItems";

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "ProductTypeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SERIAL NOT NULL,
    "Type" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "CreatedDate" TEXT NOT NULL,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_ProductTypeId_fkey" FOREIGN KEY ("ProductTypeId") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
