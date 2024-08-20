/*
  Warnings:

  - You are about to drop the column `coord_x` on the `EquipmentsOnPanorama` table. All the data in the column will be lost.
  - You are about to drop the column `coord_y` on the `EquipmentsOnPanorama` table. All the data in the column will be lost.
  - You are about to drop the column `coord_x` on the `notes_on_panoramas` table. All the data in the column will be lost.
  - You are about to drop the column `coord_y` on the `notes_on_panoramas` table. All the data in the column will be lost.
  - Added the required column `pitch` to the `EquipmentsOnPanorama` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yaw` to the `EquipmentsOnPanorama` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pitch` to the `notes_on_panoramas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yaw` to the `notes_on_panoramas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EquipmentsOnPanorama" DROP COLUMN "coord_x",
DROP COLUMN "coord_y",
ADD COLUMN     "pitch" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yaw" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "notes_on_panoramas" DROP COLUMN "coord_x",
DROP COLUMN "coord_y",
ADD COLUMN     "pitch" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yaw" DOUBLE PRECISION NOT NULL;
