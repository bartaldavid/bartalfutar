CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(255),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `favorite_stops` (
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`stop_id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	CONSTRAINT `favorite_stops_stop_id_user_id` PRIMARY KEY(`stop_id`,`user_id`)
);
--> statement-breakpoint
CREATE TABLE `routes` (
	`id` varchar(255) NOT NULL,
	`short_name` varchar(255),
	`long_name` varchar(255),
	`description` varchar(255),
	`type` varchar(255),
	`url` varchar(255),
	`color` varchar(6),
	`text_color` varchar(6),
	`agency_id` varchar(255),
	`icon_display_type` varchar(255),
	`icon_display_text` varchar(255),
	`bikes_allowed` boolean,
	`style` json,
	`sort_order` int,
	CONSTRAINT `routes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `stops` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`code` varchar(255),
	`lat` double,
	`lon` double,
	`direction` varchar(4),
	`platform_code` varchar(255),
	`description` varchar(255),
	`location_type` int,
	`location_sub_type` varchar(255),
	`parent_station_id` varchar(255),
	`type` varchar(255),
	`wheelchair_boarding` boolean,
	`stopColorType` varchar(255),
	`style` json,
	CONSTRAINT `stops_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stops_routes` (
	`stop_id` varchar(255) NOT NULL,
	`route_id` varchar(255) NOT NULL,
	CONSTRAINT `stops_routes_route_id_stop_id` PRIMARY KEY(`route_id`,`stop_id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `user_index` ON `favorite_stops` (`user_id`);--> statement-breakpoint
CREATE INDEX `stop_index` ON `favorite_stops` (`stop_id`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `session` (`userId`);--> statement-breakpoint
CREATE INDEX `stop_index` ON `stops_routes` (`stop_id`);--> statement-breakpoint
CREATE INDEX `route_index` ON `stops_routes` (`route_id`);