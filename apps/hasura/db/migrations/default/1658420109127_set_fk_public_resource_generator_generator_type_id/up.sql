alter table "public"."resource_generator"
  add constraint "resource_generator_generator_type_id_fkey"
  foreign key ("generator_type_id")
  references "public"."resource_generator_type"
  ("id") on update restrict on delete restrict;
