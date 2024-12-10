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
