alter table "public"."quest" alter column "unlocked_npc_id" drop not null;
alter table "public"."quest" add column "unlocked_npc_id" uuid;
