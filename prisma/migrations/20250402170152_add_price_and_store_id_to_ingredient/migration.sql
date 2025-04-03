/*
  Warnings:

  - You are about to drop the column `city` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Store` table. All the data in the column will be lost.
  - Added the required column `storeId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- First add the columns as nullable
ALTER TABLE "Ingredient" ADD COLUMN "price" DOUBLE PRECISION;
ALTER TABLE "Ingredient" ADD COLUMN "storeId" TEXT;

-- Update existing records with default values
UPDATE "Ingredient" SET "price" = 0 WHERE "price" IS NULL;
UPDATE "Ingredient" SET "storeId" = (SELECT "id" FROM "Store" LIMIT 1) WHERE "storeId" IS NULL;

-- Make the columns required
ALTER TABLE "Ingredient" ALTER COLUMN "price" SET NOT NULL;
ALTER TABLE "Ingredient" ALTER COLUMN "storeId" SET NOT NULL;

-- Add the foreign key constraint
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Add the ingredients relation to Store
ALTER TABLE "Store" ADD COLUMN "ingredients" TEXT[];

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "city",
DROP COLUMN "state",
DROP COLUMN "street",
DROP COLUMN "zipCode";
