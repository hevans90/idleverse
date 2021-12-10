
DROP TABLE "food"."garden";

DROP TABLE "food"."house_food_demand";

DROP TABLE "food"."player_food";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- drop schema "food_options" cascade;

drop schema "food_options" cascade;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."player" add column "cash" integer
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."player" add column "colour" text
--  null;

DROP TABLE "food"."advert";

alter table "food"."house" drop constraint "house_board_object_fkey";

alter table "food"."diner" drop constraint "diner_board_object_fkey";

alter table "food"."house" rename column "board_object" to "object";

alter table "food"."diner" rename column "board_object" to "object";

alter table "food"."diner" rename column "object" to "board_object";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."house" add column "object" uuid
--  null;

alter table "food"."house"
  add constraint "house_id_fkey"
  foreign key ("id")
  references "food"."board_object"
  ("id") on update restrict on delete restrict;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."diner" add column "board_object" uuid
--  null;

DROP TABLE "food"."diner";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."employee" add column "kind" uuid
--  null;

alter table "food"."employee" alter column "kind" drop not null;
alter table "food"."employee" add column "kind" text;

DROP TABLE "food"."drink";

DROP TABLE "food"."house";

DROP TABLE "food"."road";

DROP TABLE "food"."board_object";

alter table "food"."employee" rename column "promoted_from" to "promotes_from";

DROP TABLE "food"."employee";

DROP TABLE "food"."player";

DROP TABLE "food"."game";

drop schema "food" cascade;
