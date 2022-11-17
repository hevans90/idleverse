ALTER TABLE "public"."technology" ALTER COLUMN "children" TYPE uuid[];
alter table "public"."technology" alter column "children" set default '{}';
