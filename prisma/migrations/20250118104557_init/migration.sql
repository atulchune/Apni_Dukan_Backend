-- CreateTable
CREATE TABLE "categoryItems" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categoryItems_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "categoryItems" ADD CONSTRAINT "categoryItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
