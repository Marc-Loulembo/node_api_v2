/*
  Warnings:

  - Added the required column `categoryId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert default category
INSERT INTO `categories` (`name`, `description`, `createdAt`, `updatedAt`) VALUES ('Général', 'Catégorie par défaut pour les posts existants', NOW(), NOW());

-- AlterTable - Add categoryId column with default value
ALTER TABLE `posts` ADD COLUMN `categoryId` INTEGER NOT NULL DEFAULT 1;

-- Remove default value after setting all existing posts to category 1
ALTER TABLE `posts` ALTER COLUMN `categoryId` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
