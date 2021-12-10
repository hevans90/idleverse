alter table "food"."employee" alter column "kind" drop not null;
alter table "food"."employee" add column "kind" text;
