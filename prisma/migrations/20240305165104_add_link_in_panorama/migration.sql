-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "coord_x" INTEGER NOT NULL,
    "coord_y" INTEGER NOT NULL,
    "panoramaId" TEXT,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "linksOnPanoramas" (
    "panorama_id" TEXT NOT NULL,
    "link_id" TEXT NOT NULL,

    CONSTRAINT "linksOnPanoramas_pkey" PRIMARY KEY ("panorama_id","link_id")
);

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_panoramaId_fkey" FOREIGN KEY ("panoramaId") REFERENCES "panoramas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "linksOnPanoramas" ADD CONSTRAINT "linksOnPanoramas_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "linksOnPanoramas" ADD CONSTRAINT "linksOnPanoramas_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
