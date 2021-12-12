

alter table "food"."advert" drop constraint "advert_game_fkey";

alter table "food"."drink" drop constraint "drink_game_fkey";

alter table "food"."employee" drop constraint "employee_game_fkey";

alter table "food"."player" drop constraint "player_game_fkey";

alter table "food"."road" drop constraint "road_game_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."road_connection" add column "number" integer
--  null;

DROP TABLE "food"."road_connection";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."advert" add column "game" uuid
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."employee" add column "game" uuid
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."drink" add column "game" uuid
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."board_object" add column "game" uuid
--  null;

alter table "food"."advert" drop constraint "advert_game_fkey";

alter table "food"."drink" drop constraint "drink_game_fkey";

alter table "food"."employee" drop constraint "employee_game_fkey";

alter table "food"."player" drop constraint "player_game_fkey";

alter table "food"."road" drop constraint "road_game_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."road_connection" add column "number" integer
--  null;

DROP TABLE "food"."road_connection";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."advert" add column "game" uuid
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."employee" add column "game" uuid
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."drink" add column "game" uuid
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "food"."board_object" add column "game" uuid
--  null;
