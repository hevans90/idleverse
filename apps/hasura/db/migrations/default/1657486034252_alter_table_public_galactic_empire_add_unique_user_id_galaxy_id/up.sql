alter table "public"."galactic_empire" add constraint "galactic_empire_user_id_galaxy_id_key" unique ("user_id", "galaxy_id");
