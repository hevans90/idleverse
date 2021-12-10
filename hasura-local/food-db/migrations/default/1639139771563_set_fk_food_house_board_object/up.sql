alter table "food"."house"
  add constraint "house_board_object_fkey"
  foreign key ("board_object")
  references "food"."board_object"
  ("id") on update restrict on delete restrict;
