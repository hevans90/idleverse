alter table "public"."galactic_empire_quest" drop constraint "galactic_empire_quest_galactic_empire_id_fkey",
  add constraint "galactic_empire_quest_galactic_empire_id_fkey"
  foreign key ("galactic_empire_id")
  references "public"."galactic_empire"
  ("id") on update restrict on delete cascade;
