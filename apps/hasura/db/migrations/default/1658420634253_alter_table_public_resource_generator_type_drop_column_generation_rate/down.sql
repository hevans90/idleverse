alter table "public"."resource_generator_type" alter column "generation_rate" drop not null;
alter table "public"."resource_generator_type" add column "generation_rate" int4;
