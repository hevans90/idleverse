CREATE TABLE "public"."planetary_ring" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "rotation" Numeric[] NOT NULL, "type" text NOT NULL, "colors" Text[] NOT NULL, "terrain_bias" Numeric[] NOT NULL, "inner_radius" numeric NOT NULL, "outer_radius" numeric NOT NULL, "resolution" integer NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
