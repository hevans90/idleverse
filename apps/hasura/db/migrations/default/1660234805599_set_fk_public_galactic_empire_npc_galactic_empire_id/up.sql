alter table "public"."galactic_empire_npc"
  add constraint "galactic_empire_npc_galactic_empire_id_fkey"
  foreign key ("galactic_empire_id")
  references "public"."galactic_empire"
  ("id") on update restrict on delete restrict;
