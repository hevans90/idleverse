alter table "public"."galactic_empire" alter column "res_hydrocarbons" drop not null;
alter table "public"."galactic_empire" add column "res_hydrocarbons" int4;
