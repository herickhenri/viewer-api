/*
  Warnings:

  - You are about to drop the column `createdAt` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `equipmentId` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `gps_x` on the `panoramas` table. All the data in the column will be lost.
  - You are about to drop the column `gps_y` on the `panoramas` table. All the data in the column will be lost.
  - You are about to drop the column `image_link` on the `panoramas` table. All the data in the column will be lost.
  - You are about to drop the `markings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `photos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_at` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "markings" DROP CONSTRAINT "markings_equipment_id_fkey";

-- DropForeignKey
ALTER TABLE "markings" DROP CONSTRAINT "markings_panorama_id_fkey";

-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_equipmentId_fkey";

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "createdAt",
DROP COLUMN "equipmentId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "equipment_id" TEXT;

-- AlterTable
ALTER TABLE "panoramas" DROP COLUMN "gps_x",
DROP COLUMN "gps_y",
DROP COLUMN "image_link",
ADD COLUMN     "image_links" TEXT[];

-- DropTable
DROP TABLE "markings";

-- DropTable
DROP TABLE "photos";

-- CreateTable
CREATE TABLE "equipment_photos" (
    "key" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "equipment_id" TEXT,

    CONSTRAINT "equipment_photos_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "EquipmentsOnPanorama" (
    "coord_x" INTEGER NOT NULL,
    "coord_y" INTEGER NOT NULL,
    "equipment_id" TEXT NOT NULL,
    "panorama_id" TEXT NOT NULL,

    CONSTRAINT "EquipmentsOnPanorama_pkey" PRIMARY KEY ("panorama_id","equipment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipment_photos_link_key" ON "equipment_photos"("link");

-- AddForeignKey
ALTER TABLE "equipment_photos" ADD CONSTRAINT "equipment_photos_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipaments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipaments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsOnPanorama" ADD CONSTRAINT "EquipmentsOnPanorama_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsOnPanorama" ADD CONSTRAINT "EquipmentsOnPanorama_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
