/*
  Warnings:

  - You are about to drop the column `img` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Token` table. All the data in the column will be lost.
  - Added the required column `type` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "bookmarked" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Token" ("address", "bookmarked", "createdAt", "id", "updatedAt", "userId") SELECT "address", "bookmarked", "createdAt", "id", "updatedAt", "userId" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token_address_key" ON "Token"("address");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
