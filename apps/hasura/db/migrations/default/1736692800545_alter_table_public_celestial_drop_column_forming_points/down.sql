alter table "public"."celestial" alter column "forming_points" set default '10'::numeric;
alter table "public"."celestial" alter column "forming_points" drop not null;
alter table "public"."celestial" add column "forming_points" numeric;
