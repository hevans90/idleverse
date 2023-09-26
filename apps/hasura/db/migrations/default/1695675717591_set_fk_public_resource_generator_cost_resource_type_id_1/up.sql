alter table "public"."resource_generator"
  add constraint "resource_generator_cost_resource_type_id_1_fkey"
  foreign key ("cost_resource_type_id_1")
  references "public"."resource_type"
  ("id") on update restrict on delete restrict;
