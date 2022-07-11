alter table "public"."galactic_empire"
  add constraint "galactic_empire_homeworld_id_fkey"
  foreign key ("homeworld_id")
  references "public"."planet"
  ("id") on update restrict on delete restrict;
