/*
  Warnings:

  - You are about to drop the `photos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_equipment_id_fkey";

-- AlterTable
ALTER TABLE "equipaments" ADD COLUMN     "photos" TEXT[];

-- DropTable
DROP TABLE "photos";
