alter table "public"."quest"
  add constraint "quest_unlocked_npc_id_fkey"
  foreign key ("unlocked_npc_id")
  references "public"."npc"
  ("id") on update restrict on delete restrict;
