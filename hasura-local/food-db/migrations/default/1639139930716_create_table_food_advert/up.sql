CREATE TABLE "food"."advert" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "board_object" uuid NOT NULL, "kind" uuid NOT NULL, "food_quantity" integer NOT NULL, "food_kind" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("board_object") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
