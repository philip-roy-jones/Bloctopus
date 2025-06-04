-- DropForeignKey
ALTER TABLE `VerificationToken` DROP FOREIGN KEY `VerificationToken_userId_fkey`;

-- DropIndex
DROP INDEX `VerificationToken_userId_fkey` ON `VerificationToken`;

-- AddForeignKey
ALTER TABLE `VerificationToken` ADD CONSTRAINT `VerificationToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
