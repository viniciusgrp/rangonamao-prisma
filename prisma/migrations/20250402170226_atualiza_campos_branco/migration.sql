/*
  Warnings:

  - You are about to drop the column `ingredients` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "price" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "ingredients";
