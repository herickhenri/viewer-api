/*
  Warnings:

  - The primary key for the `links` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `links` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "links" DROP CONSTRAINT "links_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "links_pkey" PRIMARY KEY ("panorama_id", "panorama_connect_id");
