alter table "food"."house"
  add constraint "house_id_fkey"
  foreign key ("id")
  references "food"."board_object"
  ("id") on update restrict on delete restrict;
