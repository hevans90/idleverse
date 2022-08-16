alter table "public"."quest_reward"
  add constraint "quest_reward_type_fkey"
  foreign key ("type")
  references "public"."quest_reward_type"
  ("value") on update restrict on delete restrict;
