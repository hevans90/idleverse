alter table "public"."galactic_empire" alter column "res_galactic_credits" drop not null;
alter table "public"."galactic_empire" add column "res_galactic_credits" int4;
