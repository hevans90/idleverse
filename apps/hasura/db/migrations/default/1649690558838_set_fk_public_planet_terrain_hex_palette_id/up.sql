alter table "public"."planet"
  add constraint "planet_terrain_hex_palette_id_fkey"
  foreign key ("terrain_hex_palette_id")
  references "public"."terrain_hex_palette"
  ("id") on update restrict on delete restrict;
