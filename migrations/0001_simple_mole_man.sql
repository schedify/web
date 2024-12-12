CREATE TABLE "retries" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"retry_at" bigint NOT NULL,
	"retry_method" varchar(50) NOT NULL,
	"retry_status" varchar(50) NOT NULL,
	"error_message" varchar(255),
	"created_at" bigint,
	"webhook_event_id" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webhook_events" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"event" varchar(50) NOT NULL,
	"status" varchar(50) NOT NULL,
	"payload" json,
	"created_at" bigint,
	"processed_at" bigint,
	"error_message" varchar(255),
	"retry_count" integer DEFAULT 0,
	"webhook_id" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "retries" ADD CONSTRAINT "retries_webhook_event_id_webhook_events_id_fk" FOREIGN KEY ("webhook_event_id") REFERENCES "public"."webhook_events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "webhook_events" ADD CONSTRAINT "webhook_events_webhook_id_webhooks_id_fk" FOREIGN KEY ("webhook_id") REFERENCES "public"."webhooks"("id") ON DELETE no action ON UPDATE no action;