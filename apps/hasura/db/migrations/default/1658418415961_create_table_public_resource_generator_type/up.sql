CREATE TABLE "public"."resource_generator_type" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "description" text NOT NULL, "resource_type_id" uuid NOT NULL, "generation_rate" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("resource_type_id") REFERENCES "public"."resource_type"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
