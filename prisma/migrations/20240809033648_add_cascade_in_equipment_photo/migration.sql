-- DropForeignKey
ALTER TABLE "equipment_photos" DROP CONSTRAINT "equipment_photos_equipment_id_fkey";

-- AddForeignKey
ALTER TABLE "equipment_photos" ADD CONSTRAINT "equipment_photos_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
