alter table "public"."quest_step" alter column "initial" drop not null;
ALTER TABLE "public"."quest_step" ALTER COLUMN "initial" drop default;
