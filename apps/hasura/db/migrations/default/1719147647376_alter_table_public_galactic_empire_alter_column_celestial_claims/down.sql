alter table "public"."galactic_empire" rename column "system_forming_points" to "celestial_claims";
alter table "public"."galactic_empire" alter column "celestial_claims" set default '0';
ALTER TABLE "public"."galactic_empire" ALTER COLUMN "celestial_claims" TYPE integer;
