CREATE TABLE "public"."galactic_empire_npc" ("npc_id" uuid NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , FOREIGN KEY ("npc_id") REFERENCES "public"."npc"("id") ON UPDATE restrict ON DELETE restrict);COMMENT ON TABLE "public"."galactic_empire_npc" IS E'NPCs unlocked for this empire';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
