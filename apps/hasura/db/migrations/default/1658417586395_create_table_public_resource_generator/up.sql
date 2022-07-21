CREATE TABLE "public"."resource_generator" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "galactic_empire_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("galactic_empire_id") REFERENCES "public"."galactic_empire"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_resource_generator_updated_at"
BEFORE UPDATE ON "public"."resource_generator"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_resource_generator_updated_at" ON "public"."resource_generator" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
