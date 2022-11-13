ALTER TABLE "public"."technology" ALTER COLUMN "children" drop default;
ALTER TABLE "public"."technology" ALTER COLUMN "children" TYPE ARRAY;
