CREATE TABLE "public"."playable_race" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."playable_race" IS E'Playable races';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
