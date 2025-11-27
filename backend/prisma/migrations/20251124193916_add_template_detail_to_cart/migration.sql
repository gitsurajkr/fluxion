/*
  Warnings:

  - A unique constraint covering the columns `[userId,tempelateId,tempelateDetailId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Cart_userId_tempelateId_key";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "tempelateDetailId" TEXT;

-- CreateIndex
CREATE INDEX "Cart_tempelateDetailId_idx" ON "Cart"("tempelateDetailId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_tempelateId_tempelateDetailId_key" ON "Cart"("userId", "tempelateId", "tempelateDetailId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_tempelateDetailId_fkey" FOREIGN KEY ("tempelateDetailId") REFERENCES "TempelateDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
