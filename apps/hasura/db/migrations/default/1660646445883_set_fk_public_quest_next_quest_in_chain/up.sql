alter table "public"."quest"
  add constraint "quest_next_quest_in_chain_fkey"
  foreign key ("next_quest_in_chain")
  references "public"."quest"
  ("id") on update restrict on delete restrict;
