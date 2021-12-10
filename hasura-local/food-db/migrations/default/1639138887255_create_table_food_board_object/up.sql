CREATE TABLE "food"."board_object" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "kind" text NOT NULL, "i" integer NOT NULL, "j" integer NOT NULL, "rotation" integer NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
