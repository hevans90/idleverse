alter table "public"."quest" alter column "unlocked_resource_type_id" drop not null;
alter table "public"."quest" add column "unlocked_resource_type_id" uuid;
