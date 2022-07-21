alter table "public"."resource_generator" alter column "resource_type_id" drop not null;
alter table "public"."resource_generator" add column "resource_type_id" uuid;
