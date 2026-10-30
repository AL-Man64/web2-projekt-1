CREATE TABLE "pass" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(50) NOT NULL,
	"document" varchar(50) NOT NULL,
	"issued_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar DEFAULT 'ACTIVE' NOT NULL
);
