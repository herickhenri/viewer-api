-- CreateTable
CREATE TABLE "photos" (
    "key" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "photos_link_key" ON "photos"("link");
