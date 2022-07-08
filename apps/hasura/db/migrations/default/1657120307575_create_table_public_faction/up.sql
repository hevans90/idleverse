CREATE TABLE "public"."faction" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("name"));COMMENT ON TABLE "public"."faction" IS E'NPC factions';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
