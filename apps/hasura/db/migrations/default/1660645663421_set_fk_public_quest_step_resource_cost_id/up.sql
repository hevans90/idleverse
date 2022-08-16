alter table "public"."quest_step"
  add constraint "quest_step_resource_cost_id_fkey"
  foreign key ("resource_cost_id")
  references "public"."resource_type"
  ("id") on update restrict on delete restrict;
