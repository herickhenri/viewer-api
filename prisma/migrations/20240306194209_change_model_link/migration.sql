/*
  Warnings:

  - You are about to drop the column `panoramaId` on the `links` table. All the data in the column will be lost.
  - You are about to drop the `linksOnPanoramas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `panorama_connect_id` to the `links` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_panoramaId_fkey";

-- DropForeignKey
ALTER TABLE "linksOnPanoramas" DROP CONSTRAINT "linksOnPanoramas_link_id_fkey";

-- DropForeignKey
ALTER TABLE "linksOnPanoramas" DROP CONSTRAINT "linksOnPanoramas_panorama_id_fkey";

-- AlterTable
ALTER TABLE "links" DROP COLUMN "panoramaId",
ADD COLUMN     "panorama_connect_id" TEXT NOT NULL,
ADD COLUMN     "panorama_id" TEXT;

-- DropTable
DROP TABLE "linksOnPanoramas";

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
