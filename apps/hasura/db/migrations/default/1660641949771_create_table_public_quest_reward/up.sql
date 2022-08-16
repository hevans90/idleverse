CREATE TABLE "public"."quest_reward" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "quest_id" uuid NOT NULL, "type" quest_reward_type NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("quest_id") REFERENCES "public"."quest"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
