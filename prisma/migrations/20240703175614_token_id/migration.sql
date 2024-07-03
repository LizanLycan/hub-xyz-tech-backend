/*
  Warnings:

  - A unique constraint covering the columns `[address,tokenId]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Token_address_key";

-- CreateIndex
CREATE UNIQUE INDEX "Token_address_tokenId_key" ON "Token"("address", "tokenId");
