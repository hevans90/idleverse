ALTER TABLE "public"."galactic_empire" ALTER COLUMN "celestial_claims" TYPE numeric;
alter table "public"."galactic_empire" alter column "celestial_claims" set default '10';
alter table "public"."galactic_empire" rename column "celestial_claims" to "system_forming_points";
