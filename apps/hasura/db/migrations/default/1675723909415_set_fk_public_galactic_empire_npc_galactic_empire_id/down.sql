alter table "public"."galactic_empire_npc" drop constraint "galactic_empire_npc_galactic_empire_id_fkey",
  add constraint "galactic_empire_npc_galactic_empire_id_fkey"
  foreign key ("galactic_empire_id")
  references "public"."galactic_empire"
  ("id") on update restrict on delete restrict;
