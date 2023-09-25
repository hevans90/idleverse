alter table "public"."galactic_empire_resource_generator"
  add constraint "galactic_empire_resource_generator_planet_id_fkey"
  foreign key ("planet_id")
  references "public"."planet"
  ("id") on update restrict on delete cascade;
