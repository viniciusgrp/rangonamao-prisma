/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Store_email_key" ON "Store"("email");
