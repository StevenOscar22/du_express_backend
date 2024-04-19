/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Tag_name_key` ON `tag`;

-- DropIndex
DROP INDEX `Users_email_key` ON `users`;

-- AlterTable
ALTER TABLE `blog` MODIFY `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `email`,
    DROP COLUMN `name`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_email_key` ON `Profile`(`email`);
