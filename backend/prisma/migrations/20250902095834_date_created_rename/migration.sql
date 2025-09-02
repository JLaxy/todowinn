/*
  Warnings:

  - You are about to drop the column `dateCreated` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Projects` DROP COLUMN `dateCreated`,
    ADD COLUMN `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
