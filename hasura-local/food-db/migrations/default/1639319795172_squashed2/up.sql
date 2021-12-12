
alter table "food"."board_object" add column "game" uuid
 null;

alter table "food"."drink" add column "game" uuid
 null;

alter table "food"."employee" add column "game" uuid
 null;

alter table "food"."advert" add column "game" uuid
 null;

CREATE TABLE "food"."road_connection" ("id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "food"."road"("id") ON UPDATE restrict ON DELETE restrict);

alter table "food"."road_connection" add column "number" integer
 null;

alter table "food"."road"
  add constraint "road_game_fkey"
  foreign key ("game")
  references "food"."game"
  ("id") on update restrict on delete restrict;

alter table "food"."player"
  add constraint "player_game_fkey"
  foreign key ("game")
  references "food"."game"
  ("id") on update restrict on delete restrict;

alter table "food"."employee"
  add constraint "employee_game_fkey"
  foreign key ("game")
  references "food"."game"
  ("id") on update restrict on delete restrict;

alter table "food"."drink"
  add constraint "drink_game_fkey"
  foreign key ("game")
  references "food"."game"
  ("id") on update restrict on delete restrict;

alter table "food"."advert"
  add constraint "advert_game_fkey"
  foreign key ("game")
  references "food"."game"
  ("id") on update restrict on delete restrict;


alter table "food"."board_object" add column "game" uuid
 null;

alter table "food"."drink" add column "game" uuid
 null;

alter table "food"."employee" add column "game" uuid
 null;

alter table "food"."advert" add column "game" uuid
 null;

CREATE TABLE "food"."road_connection" ("id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "food"."road"("id") ON UPDATE restrict ON DELETE restrict);

alter table "food"."road_connection" add column "number" integer
 null;

alter table "food"."road"
  add constraint "road_game_fkey"
  foreign key ("game")
  references "food"."game"
  ("id") on update restrict on delete restrict;

alter table "food"."player"
  add constraint "player_game_fkey"
  foreign key ("game")
  references "food"."game"
  ("id") on update restrict on delete restrict;

alter table "food"."employee"
  add constraint "employee_game_fkey"
  foreign key ("game")
  references "food"."game"
  ("id") on update restrict on delete restrict;

alter table "food"."drink"
  add constraint "drink_game_fkey"
  foreign key ("game")
  references "food"."game"
  ("id") on update restrict on delete restrict;

alter table "food"."advert"
  add constraint "advert_game_fkey"
  foreign key ("game")
  references "food"."game"
  ("id") on update restrict on delete restrict;
