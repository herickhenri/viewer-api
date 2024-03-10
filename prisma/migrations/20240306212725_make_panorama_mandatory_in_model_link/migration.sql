/*
  Warnings:

  - Made the column `panorama_id` on table `links` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_panorama_id_fkey";

-- AlterTable
ALTER TABLE "links" ALTER COLUMN "panorama_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
