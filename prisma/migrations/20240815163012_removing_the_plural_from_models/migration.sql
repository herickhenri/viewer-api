/*
  Warnings:

  - You are about to drop the `Connections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NotesOnPanoramas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_connected_from_id_fkey";

-- DropForeignKey
ALTER TABLE "Connections" DROP CONSTRAINT "Connections_connected_to_id_fkey";

-- DropForeignKey
ALTER TABLE "NotesOnPanoramas" DROP CONSTRAINT "NotesOnPanoramas_note_id_fkey";

-- DropForeignKey
ALTER TABLE "NotesOnPanoramas" DROP CONSTRAINT "NotesOnPanoramas_panorama_id_fkey";

-- DropTable
DROP TABLE "Connections";

-- DropTable
DROP TABLE "NotesOnPanoramas";

-- CreateTable
CREATE TABLE "connections" (
    "connected_from_id" TEXT NOT NULL,
    "yaw_from" DOUBLE PRECISION NOT NULL,
    "pitch_from" DOUBLE PRECISION NOT NULL,
    "connected_to_id" TEXT NOT NULL,
    "yaw_to" DOUBLE PRECISION NOT NULL,
    "pitch_to" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("connected_from_id","connected_to_id")
);

-- CreateTable
CREATE TABLE "notes_on_panoramas" (
    "coord_x" INTEGER NOT NULL,
    "coord_y" INTEGER NOT NULL,
    "note_id" TEXT NOT NULL,
    "panorama_id" TEXT NOT NULL,

    CONSTRAINT "notes_on_panoramas_pkey" PRIMARY KEY ("note_id","panorama_id")
);

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_connected_from_id_fkey" FOREIGN KEY ("connected_from_id") REFERENCES "panoramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_connected_to_id_fkey" FOREIGN KEY ("connected_to_id") REFERENCES "panoramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes_on_panoramas" ADD CONSTRAINT "notes_on_panoramas_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notes_on_panoramas" ADD CONSTRAINT "notes_on_panoramas_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
