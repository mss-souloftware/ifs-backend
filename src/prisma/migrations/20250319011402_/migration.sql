/*
  Warnings:

  - Added the required column `directCheckout` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `directCheckout` BOOLEAN NOT NULL;
