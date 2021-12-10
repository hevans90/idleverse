CREATE TABLE "food"."drink" ("id" uuid NOT NULL, "kind" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict);
