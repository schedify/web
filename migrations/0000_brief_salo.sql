CREATE TABLE "apps" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"created_at" bigint,
	"updated_at" bigint,
	"user_id" varchar(50) NOT NULL
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
ALTER TABLE "webhooks" ADD CONSTRAINT "webhooks_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE no action ON UPDATE no action;