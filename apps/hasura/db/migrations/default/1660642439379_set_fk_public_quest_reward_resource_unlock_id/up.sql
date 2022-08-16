alter table "public"."quest_reward"
  add constraint "quest_reward_resource_unlock_id_fkey"
  foreign key ("resource_unlock_id")
  references "public"."resource_type"
  ("id") on update restrict on delete restrict;
