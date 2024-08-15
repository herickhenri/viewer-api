-- DropForeignKey
ALTER TABLE "EquipmentsOnPanorama" DROP CONSTRAINT "EquipmentsOnPanorama_equipment_id_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentsOnPanorama" DROP CONSTRAINT "EquipmentsOnPanorama_panorama_id_fkey";

-- DropForeignKey
ALTER TABLE "NotesOnPanoramas" DROP CONSTRAINT "NotesOnPanoramas_note_id_fkey";

-- DropForeignKey
ALTER TABLE "NotesOnPanoramas" DROP CONSTRAINT "NotesOnPanoramas_panorama_id_fkey";

-- DropForeignKey
ALTER TABLE "links" DROP CONSTRAINT "links_panorama_id_fkey";

-- DropForeignKey
ALTER TABLE "panorama_images" DROP CONSTRAINT "panorama_images_panorama_id_fkey";

-- AddForeignKey
ALTER TABLE "panorama_images" ADD CONSTRAINT "panorama_images_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsOnPanorama" ADD CONSTRAINT "EquipmentsOnPanorama_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsOnPanorama" ADD CONSTRAINT "EquipmentsOnPanorama_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotesOnPanoramas" ADD CONSTRAINT "NotesOnPanoramas_note_id_fkey" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotesOnPanoramas" ADD CONSTRAINT "NotesOnPanoramas_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
