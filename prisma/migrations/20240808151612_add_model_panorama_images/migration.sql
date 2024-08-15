/*
  Warnings:

  - You are about to drop the column `image_key` on the `panoramas` table. All the data in the column will be lost.
  - You are about to drop the column `image_links` on the `panoramas` table. All the data in the column will be lost.
  - Made the column `equipment_id` on table `equipment_photos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "equipment_photos" DROP CONSTRAINT "equipment_photos_equipment_id_fkey";

-- AlterTable
ALTER TABLE "equipment_photos" ALTER COLUMN "equipment_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "panoramas" DROP COLUMN "image_key",
DROP COLUMN "image_links";

-- CreateTable
CREATE TABLE "panorama_images" (
    "key" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "panorama_id" TEXT NOT NULL,

    CONSTRAINT "panorama_images_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "panorama_images_link_key" ON "panorama_images"("link");

-- AddForeignKey
ALTER TABLE "equipment_photos" ADD CONSTRAINT "equipment_photos_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "panorama_images" ADD CONSTRAINT "panorama_images_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
