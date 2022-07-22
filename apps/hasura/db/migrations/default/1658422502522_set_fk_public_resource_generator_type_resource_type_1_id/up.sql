alter table "public"."resource_generator_type"
  add constraint "resource_generator_type_resource_type_1_id_fkey"
  foreign key ("resource_type_1_id")
  references "public"."resource_type"
  ("id") on update restrict on delete restrict;
