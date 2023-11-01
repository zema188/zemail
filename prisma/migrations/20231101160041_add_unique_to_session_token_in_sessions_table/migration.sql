/*
  Warnings:

  - A unique constraint covering the columns `[session_token]` on the table `Sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Sessions_session_token_key` ON `Sessions`(`session_token`);
