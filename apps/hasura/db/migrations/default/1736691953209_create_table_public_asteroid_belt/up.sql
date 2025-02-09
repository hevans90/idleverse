CREATE TABLE "public"."asteroid_belt" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "celestial_id" varchar NOT NULL, "count" integer NOT NULL, "asteroid_size" text NOT NULL, "palette_id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("celestial_id") REFERENCES "public"."celestial"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("palette_id") REFERENCES "public"."terrain_hex_palette"("id") ON UPDATE restrict ON DELETE restrict);
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
CREATE TRIGGER "set_public_asteroid_belt_updated_at"
BEFORE UPDATE ON "public"."asteroid_belt"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_asteroid_belt_updated_at" ON "public"."asteroid_belt"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
