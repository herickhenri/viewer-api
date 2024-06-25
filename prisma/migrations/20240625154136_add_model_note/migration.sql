-- CreateTable
CREATE TABLE "notes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "equipment_tag" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "opportunity" INTEGER NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);
