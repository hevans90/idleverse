alter table "public"."galactic_empire" alter column "res_common_metals" drop not null;
alter table "public"."galactic_empire" add column "res_common_metals" int4;
