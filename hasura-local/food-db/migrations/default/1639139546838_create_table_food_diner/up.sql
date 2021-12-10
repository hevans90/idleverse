CREATE TABLE "food"."diner" ("id" uuid NOT NULL, "owner" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("owner") REFERENCES "food"."player"("id") ON UPDATE restrict ON DELETE restrict);
