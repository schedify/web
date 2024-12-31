CREATE TABLE "apps" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"created_at" bigint,
	"updated_at" bigint,
	"user_id" varchar(50) NOT NULL
);
--> statement-breakpoint
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
CREATE TABLE "users" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"username" text DEFAULT '',
	"first_name" text DEFAULT '',
	"last_name" text DEFAULT '',
	"banned" boolean DEFAULT false,
	"email_address" text DEFAULT '',
	"created_at" bigint,
	"updated_at" bigint
);
--> statement-breakpoint
CREATE TABLE "webhook_events" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"is_test" boolean DEFAULT false,
	"event" varchar(50) NOT NULL,
	"status" varchar(50) NOT NULL,
	"payload" json,
	"created_at" bigint,
	"updated_at" bigint,
	"scheduled_for" bigint,
	"processed_at" bigint,
	"error_message" varchar(255),
	"retry_count" integer DEFAULT 0,
	"webhook_id" varchar(50) NOT NULL,
	"app_id" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webhooks" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"url" text,
	"secret" text,
	"enabled" boolean DEFAULT true,
	"created_at" bigint,
	"updated_at" bigint,
	"app_id" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "apps" ADD CONSTRAINT "apps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retries" ADD CONSTRAINT "retries_webhook_event_id_webhook_events_id_fk" FOREIGN KEY ("webhook_event_id") REFERENCES "public"."webhook_events"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "webhook_events" ADD CONSTRAINT "webhook_events_webhook_id_webhooks_id_fk" FOREIGN KEY ("webhook_id") REFERENCES "public"."webhooks"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "webhook_events" ADD CONSTRAINT "webhook_events_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "webhooks" ADD CONSTRAINT "webhooks_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE no action ON UPDATE no action;