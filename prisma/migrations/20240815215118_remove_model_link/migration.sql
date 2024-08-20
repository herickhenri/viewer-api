/*
  Warnings:

  - You are about to drop the `links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_panorama_id_fkey";

-- DropTable
DROP TABLE "links";
