CREATE TABLE "public"."technology" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "description" text, "children" UUID[] NOT NULL, PRIMARY KEY ("id") , UNIQUE ("name"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
