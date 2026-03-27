DROP INDEX "authenticator_credentialID_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `wishlist_item` ALTER COLUMN "description" TO "description" text(30);--> statement-breakpoint
CREATE UNIQUE INDEX `authenticator_credentialID_unique` ON `authenticator` (`credentialID`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `wishlist_item` ADD `value` real;--> statement-breakpoint
ALTER TABLE `wishlist_item` DROP COLUMN `characteristics`;