alter table "public"."quest_step"
  add constraint "quest_step_npc_contact_id_fkey"
  foreign key ("npc_contact_id")
  references "public"."npc"
  ("id") on update restrict on delete restrict;
