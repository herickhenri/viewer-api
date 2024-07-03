-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "coord_x" INTEGER,
ADD COLUMN     "coord_y" INTEGER,
ADD COLUMN     "panoramaId" TEXT;

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_panoramaId_fkey" FOREIGN KEY ("panoramaId") REFERENCES "panoramas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
