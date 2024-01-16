-- CreateTable
CREATE TABLE "equipaments" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "equipaments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "equipment_id" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "panoramas" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gps_x" DECIMAL(65,30) NOT NULL,
    "gps_y" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "panoramas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "markings" (
    "coord_x" INTEGER NOT NULL,
    "coord_y" INTEGER NOT NULL,
    "equipment_id" TEXT NOT NULL,
    "panorama_id" TEXT NOT NULL,

    CONSTRAINT "markings_pkey" PRIMARY KEY ("panorama_id","equipment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipaments_tag_key" ON "equipaments"("tag");

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "markings" ADD CONSTRAINT "markings_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipaments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "markings" ADD CONSTRAINT "markings_panorama_id_fkey" FOREIGN KEY ("panorama_id") REFERENCES "panoramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
