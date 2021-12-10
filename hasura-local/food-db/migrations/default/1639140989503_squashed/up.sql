
create schema "food";

CREATE TABLE "food"."game" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "food"."player" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "food"."employee" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "kind" text NOT NULL, "promotes_from" uuid NOT NULL, "hires_available" integer NOT NULL, "trains_available" integer NOT NULL, "hired_by" uuid NOT NULL, "trained_by" uuid NOT NULL, "trained_from" uuid NOT NULL, "used" bool NOT NULL, "owner" uuid NOT NULL, "manager" uuid NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "food"."employee" rename column "promotes_from" to "promoted_from";

CREATE TABLE "food"."board_object" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "kind" text NOT NULL, "i" integer NOT NULL, "j" integer NOT NULL, "rotation" integer NOT NULL, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "food"."road" ("id" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict);

CREATE TABLE "food"."house" ("id" uuid NOT NULL, "has_garden" boolean NOT NULL, "is_extra" boolean NOT NULL, "number" integer NOT NULL, "orient" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict);

CREATE TABLE "food"."drink" ("id" uuid NOT NULL, "kind" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict);

alter table "food"."employee" drop column "kind" cascade;

alter table "food"."employee" add column "kind" uuid
 null;

CREATE TABLE "food"."diner" ("id" uuid NOT NULL, "owner" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("owner") REFERENCES "food"."player"("id") ON UPDATE restrict ON DELETE restrict);

alter table "food"."diner" add column "board_object" uuid
 null;

alter table "food"."house" drop constraint "house_id_fkey";

alter table "food"."house" add column "object" uuid
 null;

alter table "food"."diner" rename column "board_object" to "object";

alter table "food"."diner" rename column "object" to "board_object";

alter table "food"."house" rename column "object" to "board_object";

alter table "food"."diner"
  add constraint "diner_board_object_fkey"
  foreign key ("board_object")
  references "food"."board_object"
  ("id") on update restrict on delete restrict;

alter table "food"."house"
  add constraint "house_board_object_fkey"
  foreign key ("board_object")
  references "food"."board_object"
  ("id") on update restrict on delete restrict;

CREATE TABLE "food"."advert" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "board_object" uuid NOT NULL, "kind" uuid NOT NULL, "food_quantity" integer NOT NULL, "food_kind" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("board_object") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "food"."player" add column "colour" text
 null;

alter table "food"."player" add column "cash" integer
 null;

create schema "food_options";

drop schema "food_options" cascade;

CREATE TABLE "food"."player_food" ("player" uuid NOT NULL, "food_kind" uuid NOT NULL, "food_quantity" integer NOT NULL, PRIMARY KEY ("player","food_kind") , FOREIGN KEY ("player") REFERENCES "food"."player"("id") ON UPDATE restrict ON DELETE restrict);

CREATE TABLE "food"."house_food_demand" ("house" uuid NOT NULL, "food_kind" uuid NOT NULL, "food_quantity" integer NOT NULL, PRIMARY KEY ("house","food_kind") , FOREIGN KEY ("house") REFERENCES "food"."house"("id") ON UPDATE restrict ON DELETE restrict);

CREATE TABLE "food"."garden" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "board_object" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("board_object") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
