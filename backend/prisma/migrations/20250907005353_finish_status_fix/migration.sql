/*
  Warnings:

  - The values [FINSIHED] on the enum `Changelogs_new` will be removed. If these variants are still used in the database, this will fail.
  - The values [FINSIHED] on the enum `Changelogs_new` will be removed. If these variants are still used in the database, this will fail.
  - The values [FINSIHED] on the enum `Changelogs_new` will be removed. If these variants are still used in the database, this will fail.
  - The values [FINSIHED] on the enum `Changelogs_new` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Changelogs` MODIFY `old` ENUM('TODO', 'IN_PROGRESS', 'FINISHED', 'CANCELLED') NOT NULL,
    MODIFY `new` ENUM('TODO', 'IN_PROGRESS', 'FINISHED', 'CANCELLED') NOT NULL;

-- AlterTable
ALTER TABLE `Projects` MODIFY `status` ENUM('TODO', 'IN_PROGRESS', 'FINISHED', 'CANCELLED') NOT NULL DEFAULT 'IN_PROGRESS';

-- AlterTable
ALTER TABLE `Tasks` MODIFY `status` ENUM('TODO', 'IN_PROGRESS', 'FINISHED', 'CANCELLED') NOT NULL DEFAULT 'TODO';
