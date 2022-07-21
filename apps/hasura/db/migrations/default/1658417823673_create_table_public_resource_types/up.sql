CREATE TABLE "public"."resource_types" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "type" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("type"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
