CREATE TABLE `wishlist_item` (
	`id` text PRIMARY KEY NOT NULL,
	`wishlistId` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`characteristics` text NOT NULL,
	FOREIGN KEY (`wishlistId`) REFERENCES `wishlist`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `wishlist` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
