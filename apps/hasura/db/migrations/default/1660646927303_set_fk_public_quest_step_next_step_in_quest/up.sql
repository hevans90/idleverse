alter table "public"."quest_step"
  add constraint "quest_step_next_step_in_quest_fkey"
  foreign key ("next_step_in_quest")
  references "public"."quest_step"
  ("id") on update restrict on delete restrict;
