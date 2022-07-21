alter table "public"."resource_generator_type" alter column "resource_type_id" drop not null;
alter table "public"."resource_generator_type" add column "resource_type_id" uuid;
