alter table "public"."planet" alter column "owner_id" drop not null;
ALTER TABLE "public"."planet" ALTER COLUMN "owner_id" TYPE text;
