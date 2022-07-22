alter table "public"."galactic_empire" alter column "res_energy_capacity" drop not null;
alter table "public"."galactic_empire" add column "res_energy_capacity" int4;
