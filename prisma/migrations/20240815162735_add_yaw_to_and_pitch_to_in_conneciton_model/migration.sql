/*
  Warnings:

  - You are about to drop the column `pitch` on the `Connections` table. All the data in the column will be lost.
  - You are about to drop the column `yaw` on the `Connections` table. All the data in the column will be lost.
  - Added the required column `pitch_from` to the `Connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pitch_to` to the `Connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yaw_from` to the `Connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yaw_to` to the `Connections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Connections" DROP COLUMN "pitch",
DROP COLUMN "yaw",
ADD COLUMN     "pitch_from" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pitch_to" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yaw_from" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yaw_to" DOUBLE PRECISION NOT NULL;
