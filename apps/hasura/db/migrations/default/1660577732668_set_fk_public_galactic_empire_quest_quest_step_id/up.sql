alter table "public"."galactic_empire_quest"
  add constraint "galactic_empire_quest_quest_step_id_fkey"
  foreign key ("quest_step_id")
  references "public"."quest_step"
  ("id") on update restrict on delete restrict;
