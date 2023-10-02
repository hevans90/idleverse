alter table "public"."resource_generator_type"
  add constraint "resource_generator_type_unlocked_by_technology_id_fkey"
  foreign key ("unlocked_by_technology_id")
  references "public"."technology"
  ("id") on update restrict on delete restrict;
