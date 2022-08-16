alter table "public"."quest_reward"
  add constraint "quest_reward_resource_accrual_type_id_fkey"
  foreign key ("resource_accrual_type_id")
  references "public"."resource_type"
  ("id") on update restrict on delete restrict;
