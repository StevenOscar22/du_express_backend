/*
  Warnings:

  - Made the column `address` on table `profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `profile` MODIFY `address` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `phone` VARCHAR(191) NOT NULL DEFAULT '';
