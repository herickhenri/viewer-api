/*
  Warnings:

  - You are about to drop the column `pitch_from` on the `connections` table. All the data in the column will be lost.
  - You are about to drop the column `pitch_to` on the `connections` table. All the data in the column will be lost.
  - You are about to drop the column `yaw_from` on the `connections` table. All the data in the column will be lost.
  - You are about to drop the column `yaw_to` on the `connections` table. All the data in the column will be lost.
  - Added the required column `pitch` to the `connections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yaw` to the `connections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "connections" DROP COLUMN "pitch_from",
DROP COLUMN "pitch_to",
DROP COLUMN "yaw_from",
DROP COLUMN "yaw_to",
ADD COLUMN     "pitch" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yaw" DOUBLE PRECISION NOT NULL;
