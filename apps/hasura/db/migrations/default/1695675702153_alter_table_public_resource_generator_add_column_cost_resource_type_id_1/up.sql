CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."resource_generator" add column "cost_resource_type_id_1" uuid
 not null default 'd10375d2-ef6e-4afc-9ada-cd80b8282954';
