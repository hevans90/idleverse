alter table "public"."quest"
  add constraint "quest_unlocked_resource_type_id_fkey"
  foreign key ("unlocked_resource_type_id")
  references "public"."resource_type"
  ("id") on update restrict on delete restrict;
