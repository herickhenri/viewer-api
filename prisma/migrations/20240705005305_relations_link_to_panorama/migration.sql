/*
  Warnings:

  - You are about to drop the column `coord_x` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `coord_y` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `panoramaId` on the `notes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_panoramaId_fkey";

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "coord_x",
DROP COLUMN "coord_y",
DROP COLUMN "panoramaId";

-- CreateTable
CREATE TABLE "NotesOnPanoramas" (
    "coord_x" INTEGER NOT NULL,
    "coord_y" INTEGER NOT NULL,
    "note_id" TEXT NOT NULL,
    "panorama_id" TEXT NOT NULL,

    CONSTRAINT "NotesOnPanoramas_pkey" PRIMARY KEY ("note_id","panorama_id")
);

-- AddForeignKey
ALTER TABLE "NotesOnPanoramas" ADD CONSTRAINT "NotesOnPanoramas_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotesOnPanoramas" ADD CONSTRAINT "NotesOnPanoramas_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
