CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"surname" text NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id")
);
