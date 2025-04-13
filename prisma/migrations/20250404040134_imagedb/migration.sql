-- CreateTable
CREATE TABLE "Images" (
    "productId" INTEGER NOT NULL,
    "filetId" SERIAL NOT NULL,
    "fileName" TEXT,
    "filePath" TEXT,
    "fileType" TEXT,
    "fileSize" INTEGER NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("filetId")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("ProductId") ON DELETE RESTRICT ON UPDATE CASCADE;
