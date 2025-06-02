-- AlterTable
ALTER TABLE `Task` ADD COLUMN `endTime` DATETIME(3) NULL,
    ADD COLUMN `scheduledDate` DATETIME(3) NULL,
    ADD COLUMN `startTime` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `Task_scheduledDate_idx` ON `Task`(`scheduledDate`);
