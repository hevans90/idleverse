alter table "public"."quest"
  add constraint "quest_type_fkey"
  foreign key ("type")
  references "public"."quest_type"
  ("value") on update restrict on delete restrict;
