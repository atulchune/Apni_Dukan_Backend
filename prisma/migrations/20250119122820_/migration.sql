/*
  Warnings:

  - The primary key for the `ProductType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductType` table. All the data in the column will be lost.
  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Products` table. All the data in the column will be lost.
  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_ProductTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_categoryId_fkey";

-- AlterTable
ALTER TABLE "ProductType" DROP CONSTRAINT "ProductType_pkey",
DROP COLUMN "id",
ADD COLUMN     "ProductTypeId" SERIAL NOT NULL,
ADD CONSTRAINT "ProductType_pkey" PRIMARY KEY ("ProductTypeId");

-- AlterTable
ALTER TABLE "Products" DROP CONSTRAINT "Products_pkey",
DROP COLUMN "id",
ADD COLUMN     "ProductId" SERIAL NOT NULL,
ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("ProductId");

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
DROP COLUMN "id",
ADD COLUMN     "CategoryId" SERIAL NOT NULL,
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("CategoryId");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_ProductTypeId_fkey" FOREIGN KEY ("ProductTypeId") REFERENCES "ProductType"("ProductTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;
