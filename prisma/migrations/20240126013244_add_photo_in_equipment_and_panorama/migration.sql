/*
  Warnings:

  - You are about to drop the column `photos` on the `equipaments` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `panoramas` table. All the data in the column will be lost.
  - Added the required column `image_key` to the `panoramas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_link` to the `panoramas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipaments" DROP COLUMN "photos";

-- AlterTable
ALTER TABLE "panoramas" DROP COLUMN "image",
ADD COLUMN     "image_key" TEXT NOT NULL,
ADD COLUMN     "image_link" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "equipmentId" TEXT;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipaments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
