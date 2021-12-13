CREATE SCHEMA "food";
CREATE TABLE "food"."game" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    PRIMARY KEY ("id")
);
CREATE TABLE "food"."player" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "game" uuid NOT NULL,
    "name" text NOT NULL,
    "colour" text null,
    "cash" integer null,
    PRIMARY KEY ("id"),
    foreign key ("game") references "food"."game" ("id") on update restrict on delete restrict
);
CREATE TABLE "food"."employee" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "game" uuid NOT NULL,
    "kind" text NOT NULL,
    "promoted_from" uuid NOT NULL,
    "hires_available" integer NOT NULL,
    "trains_available" integer NOT NULL,
    "hired_by" uuid NOT NULL,
    "trained_by" uuid NOT NULL,
    "trained_from" uuid NOT NULL,
    "used" bool NOT NULL,
    "owner" uuid NOT NULL,
    "manager" uuid NOT NULL,
    PRIMARY KEY ("id"),
    foreign key ("game") references "food"."game" ("id") on update restrict on delete restrict
);
CREATE TABLE "food"."board_object" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "kind" text NOT NULL,
    "i" integer NOT NULL,
    "j" integer NOT NULL,
    "rotation" integer NOT NULL,
    PRIMARY KEY ("id")
);
CREATE TABLE "food"."road" (
    "id" uuid NOT NULL,
    "game" uuid NOT NULL,
    PRIMARY KEY ("id"),
    foreign key ("game") references "food"."game" ("id") on update restrict on delete restrict,
    FOREIGN KEY ("id") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict
);
CREATE TABLE "food"."house" (
    "id" uuid NOT NULL,
    "game" uuid NOT NULL,
    "board_object" uuid NULL,
    "has_garden" boolean NOT NULL,
    "is_extra" boolean NOT NULL,
    "number" integer NOT NULL,
    "orient" integer NOT NULL,
    PRIMARY KEY ("id"),
    foreign key ("game") references "food"."game" ("id") on update restrict on delete restrict,
    FOREIGN KEY ("id") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict
);
CREATE TABLE "food"."drink" (
    "id" uuid NOT NULL,
    "game" uuid NOT NULL,
    "kind" uuid NOT NULL,
    PRIMARY KEY ("id"),
    foreign key ("game") references "food"."game" ("id") on update restrict on delete restrict,
    FOREIGN KEY ("id") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict
    
);
CREATE TABLE "food"."advert" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "game" uuid NOT NULL,
    "board_object" uuid NOT NULL,
    "kind" uuid NOT NULL,
    "food_quantity" integer NOT NULL,
    "food_kind" uuid NOT NULL,
    PRIMARY KEY ("id"),
    foreign key ("game") references "food"."game" ("id") on update restrict on delete restrict,
    FOREIGN KEY ("board_object") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict
);
CREATE TABLE "food"."garden" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "game" uuid NOT NULL,
    "board_object" uuid NOT NULL,
    PRIMARY KEY ("id"),
    foreign key ("game") references "food"."game" ("id") on update restrict on delete restrict,
    FOREIGN KEY ("board_object") REFERENCES "food"."board_object"("id") ON UPDATE restrict ON DELETE restrict
);
CREATE TABLE "food"."diner" (
    "id" uuid NOT NULL,
    "owner" uuid NOT NULL,
    "board_object" uuid NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("owner") REFERENCES "food"."player"("id") ON UPDATE restrict ON DELETE restrict,
    FOREIGN KEY ("board_object") REFERENCES "food"."board_object" ("id") ON UPDATE restrict ON DELETE restrict
);
CREATE TABLE "food"."player_food" (
    "player" uuid NOT NULL,
    "food_kind" text NOT NULL,
    "food_quantity" integer NOT NULL,
    PRIMARY KEY ("player", "food_kind"),
    FOREIGN KEY ("player") REFERENCES "food"."player"("id") ON UPDATE restrict ON DELETE restrict
);
CREATE TABLE "food"."house_food_demand" (
    "house" uuid NOT NULL,
    "food_kind" text NOT NULL,
    "food_quantity" integer NOT NULL,
    PRIMARY KEY ("house", "food_kind"),
    FOREIGN KEY ("house") REFERENCES "food"."house"("id") ON UPDATE restrict ON DELETE restrict
);
CREATE TABLE "food"."road_connection" (
    "id" uuid NOT NULL,
    "number" integer NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("id") REFERENCES "food"."road"("id") ON UPDATE restrict ON DELETE restrict
);