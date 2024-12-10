CREATE TABLE "apps" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" text DEFAULT '',
	"created_at" bigint,
	"updated_at" bigint,
	"user_id" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "webhooks" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"url" text,
	"secret" text,
	"secret_revealed" boolean DEFAULT false,
	"created_at" bigint,
	"updated_at" bigint,
	"app_id" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "apps" ADD CONSTRAINT "apps_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "webhooks" ADD CONSTRAINT "webhooks_app_id_apps_id_fk" FOREIGN KEY ("app_id") REFERENCES "public"."apps"("id") ON DELETE no action ON UPDATE no action;