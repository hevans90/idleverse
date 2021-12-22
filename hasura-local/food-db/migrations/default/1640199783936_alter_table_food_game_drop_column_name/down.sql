alter table "food"."game" alter column "name" drop not null;
alter table "food"."game" add column "name" text;
