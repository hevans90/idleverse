alter table "public"."galactic_empire_npc" drop constraint "galactic_empire_npc_npc_id_key";
alter table "public"."galactic_empire_npc" add constraint "galactic_empire_npc_npc_id_galactic_empire_id_key" unique ("npc_id", "galactic_empire_id");
