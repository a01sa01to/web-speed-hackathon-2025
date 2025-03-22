CREATE INDEX `channel_id_idx` ON `channel` (`id`);--> statement-breakpoint
CREATE INDEX `episode_id_idx` ON `episode` (`id`);--> statement-breakpoint
CREATE INDEX `episode_order_idx` ON `episode` (`order`);--> statement-breakpoint
CREATE INDEX `program_startAt_idx` ON `program` (`startAt`);--> statement-breakpoint
CREATE INDEX `series_id_idx` ON `series` (`id`);