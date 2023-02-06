alter table "public"."galactic_empire_resources" drop constraint "galactic_empire_resources_galactic_empire_id_fkey",
  add constraint "galactic_empire_resources_galactic_empire_id_fkey"
  foreign key ("galactic_empire_id")
  references "public"."galactic_empire"
  ("id") on update restrict on delete restrict;
