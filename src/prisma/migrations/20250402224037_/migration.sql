-- CreateTable
CREATE TABLE `ProductReviewedBy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductReviewedBy` ADD CONSTRAINT `ProductReviewedBy_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductReviewedBy` ADD CONSTRAINT `ProductReviewedBy_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `TeamSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
