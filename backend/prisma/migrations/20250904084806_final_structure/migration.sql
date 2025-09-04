/*
  Warnings:

  - The primary key for the `Projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Projects` table. All the data in the column will be lost.
  - Added the required column `description` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Projects` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `date_finished` DATETIME(3) NULL,
    ADD COLUMN `date_target` DATETIME(3) NULL,
    ADD COLUMN `description` VARCHAR(255) NOT NULL,
    ADD COLUMN `member_id` INTEGER NOT NULL,
    ADD COLUMN `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `remarks` VARCHAR(255) NULL,
    ADD COLUMN `status` ENUM('TODO', 'IN_PROGRESS', 'FINSIHED', 'CANCELLED') NOT NULL DEFAULT 'IN_PROGRESS',
    ADD PRIMARY KEY (`project_id`);

-- CreateTable
CREATE TABLE `Members` (
    `member_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Members_email_key`(`email`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tasks` (
    `task_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `date_target` DATETIME(3) NULL,
    `date_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `date_finished` DATETIME(3) NULL,
    `status` ENUM('TODO', 'IN_PROGRESS', 'FINSIHED', 'CANCELLED') NOT NULL DEFAULT 'TODO',
    `remarks` VARCHAR(255) NULL,
    `project_id` INTEGER NOT NULL,

    PRIMARY KEY (`task_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Changelogs` (
    `changelog_id` INTEGER NOT NULL AUTO_INCREMENT,
    `old` ENUM('TODO', 'IN_PROGRESS', 'FINSIHED', 'CANCELLED') NOT NULL,
    `new` ENUM('TODO', 'IN_PROGRESS', 'FINSIHED', 'CANCELLED') NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `task_id` INTEGER NOT NULL,

    PRIMARY KEY (`changelog_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Projects` ADD CONSTRAINT `Projects_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Members`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Projects`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Changelogs` ADD CONSTRAINT `Changelogs_task_id_fkey` FOREIGN KEY (`task_id`) REFERENCES `Tasks`(`task_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
