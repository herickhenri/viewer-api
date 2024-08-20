-- CreateTable
CREATE TABLE "Connections" (
    "yaw" DOUBLE PRECISION NOT NULL,
    "pitch" DOUBLE PRECISION NOT NULL,
    "connected_from_id" TEXT NOT NULL,
    "connected_to_id" TEXT NOT NULL,

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("connected_from_id","connected_to_id")
);

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_connected_from_id_fkey" FOREIGN KEY ("connected_from_id") REFERENCES "panoramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_connected_to_id_fkey" FOREIGN KEY ("connected_to_id") REFERENCES "panoramas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
