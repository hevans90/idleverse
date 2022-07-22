alter table "public"."resource_type" alter column "order" set default 0;
alter table "public"."resource_type" alter column "order" drop not null;
alter table "public"."resource_type" add column "order" int4;
