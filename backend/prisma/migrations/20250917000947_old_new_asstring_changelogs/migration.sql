/*
  Warnings:

  - You are about to alter the column `old` on the `Changelogs` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to alter the column `new` on the `Changelogs` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Changelogs` MODIFY `old` VARCHAR(191) NOT NULL,
    MODIFY `new` VARCHAR(191) NOT NULL;
