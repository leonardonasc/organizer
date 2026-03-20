DROP INDEX "authenticator_credentialID_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `wishlist_item` ALTER COLUMN "characteristics" TO "characteristics" text;--> statement-breakpoint
CREATE UNIQUE INDEX `authenticator_credentialID_unique` ON `authenticator` (`credentialID`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `wishlist_item` ADD `createdAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `wishlist` ALTER COLUMN "visibility" TO "visibility" text NOT NULL DEFAULT 'private';--> statement-breakpoint
ALTER TABLE `wishlist` ADD `createdAt` integer NOT NULL;