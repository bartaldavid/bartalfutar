CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "favorite_stops" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT 'now()' NOT NULL,
	"stop_id" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routes" (
	"id" text PRIMARY KEY NOT NULL,
	"short_name" text,
	"long_name" text,
	"description" text,
	"type" text,
	"url" text,
	"color" text,
	"text_color" text,
	"agency_id" text,
	"icon_display_type" text,
	"icon_display_text" text,
	"bikes_allowed" boolean,
	"style" jsonb,
	"sort_order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stops" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"code" text,
	"lat" double precision,
	"lon" double precision,
	"direction" text,
	"platform_code" integer,
	"description" text,
	"location_type" text,
	"location_sub_type" text,
	"parent_station_id" text,
	"type" text,
	"wheelchair_boarding" boolean,
	"routeIds" text[],
	"stopColorType" text,
	"alertIds" text[],
	"style" jsonb
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite_stops" ADD CONSTRAINT "favorite_stops_stop_id_stops_id_fk" FOREIGN KEY ("stop_id") REFERENCES "stops"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "favorite_stops" ADD CONSTRAINT "favorite_stops_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
