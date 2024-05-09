/*
  Warnings:

  - You are about to drop the column `clicks` on the `Item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "featured" BOOLEAN,
    "itemId" TEXT NOT NULL PRIMARY KEY,
    "sellerUN" TEXT NOT NULL,
    CONSTRAINT "Item_sellerUN_fkey" FOREIGN KEY ("sellerUN") REFERENCES "Seller" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("category", "description", "featured", "image", "itemId", "name", "price", "quantity", "sellerUN") SELECT "category", "description", "featured", "image", "itemId", "name", "price", "quantity", "sellerUN" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
