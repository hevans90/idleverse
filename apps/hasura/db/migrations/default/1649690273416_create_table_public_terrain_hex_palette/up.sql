CREATE TABLE "public"."terrain_hex_palette" ("water" text NOT NULL, "sand" text NOT NULL, "grass" text NOT NULL, "forest" text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
