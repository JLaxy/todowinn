/*
  Warnings:

  - Added the required column `field` to the `Changelogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Changelogs` ADD COLUMN `field` ENUM('NAME', 'DESCRIPTION', 'DATE_TARGET', 'STATUS', 'REMARKS') NOT NULL;
