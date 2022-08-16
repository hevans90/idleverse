alter table "public"."quest_step"
  add constraint "quest_step_type_fkey"
  foreign key ("type")
  references "public"."quest_step_type"
  ("value") on update restrict on delete restrict;
