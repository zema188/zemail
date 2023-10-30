/*
  Warnings:

  - A unique constraint covering the columns `[login]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `login` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Users_login_key` ON `Users`(`login`);
