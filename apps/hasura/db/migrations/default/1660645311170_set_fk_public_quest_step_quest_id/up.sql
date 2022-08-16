alter table "public"."quest_step"
  add constraint "quest_step_quest_id_fkey"
  foreign key ("quest_id")
  references "public"."quest"
  ("id") on update restrict on delete restrict;
