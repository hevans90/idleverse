CREATE TABLE "public"."quest_step" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "description" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
