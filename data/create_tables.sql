BEGIN;

DROP TABLE IF EXISTS "card_has_label",
"label",
"card",
"list";

-- ---------------------------------
-- Table "list"
-- ---------------------------------

CREATE TABLE IF NOT EXISTS "list" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- ---------------------------------
-- Table "card"
-- ---------------------------------

CREATE TABLE IF NOT EXISTS "card" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "color" TEXT NOT NULL DEFAULT '#E9DADD',
    "list_id" integer NOT NULL REFERENCES "list"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- ---------------------------------
-- Table "label"
-- ---------------------------------

CREATE TABLE IF NOT EXISTS "label"(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#FFF',
    "text_color" TEXT NOT NULL DEFAULT '#FFF',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- ---------------------------------
-- Table "card_has_label"
-- ---------------------------------

CREATE TABLE IF NOT EXISTS "card_has_label"(
    "card_id" INTEGER NOT NULL REFERENCES "card"("id") ON DELETE CASCADE,
    "label_id" INTEGER NOT NULL REFERENCES "label"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY("label_id", "card_id")
);

COMMIT;
