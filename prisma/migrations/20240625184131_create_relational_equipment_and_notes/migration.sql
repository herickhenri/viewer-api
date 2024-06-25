-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "equipmentId" TEXT;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipaments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
