/*
  Warnings:

  - Added the required column `quality` to the `panorama_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "panorama_images" ADD COLUMN     "quality" INTEGER NOT NULL;
