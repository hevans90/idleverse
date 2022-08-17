alter table "public"."galactic_empire_quest"
  add constraint "galactic_empire_quest_user_id_fkey"
  foreign key (user_id)
  references "public"."user_info"
  (id) on update restrict on delete restrict;
alter table "public"."galactic_empire_quest" alter column "user_id" drop not null;
alter table "public"."galactic_empire_quest" add column "user_id" text;
