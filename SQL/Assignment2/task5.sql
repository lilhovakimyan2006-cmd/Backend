CREATE TABLE book_signings (
    signing_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES authors(author_id),
    store_location TEXT NOT NULL,
    during TSTZRANGE NOT NULL
);

-- ERROR:  data type integer has no default operator class for access method "gist"
-- HINT:  You must specify an operator class for the index or define a default operator class for the data type.
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE book_signings
ADD CONSTRAINT no_overlapping_signings EXCLUDE USING gist (
    author_id WITH = ,
    during WITH &&
);

INSERT INTO book_signings (author_id, store_location, during)
VALUES (
    1,
    'Yerevan Bookstore',
    '[2026-11-01 14:00+04, 2026-11-01 16:00+04)'::tstzrange
);

INSERT INTO book_signings (author_id, store_location, during)
VALUES (
    1,
    'Yerevan Bookstore',
    '[2026-11-01 15:00+04, 2026-11-01 17:00+04)'::tstzrange
);

INSERT INTO book_signings (author_id, store_location, during)
VALUES (
    2,
    'Yerevan Bookstore',
    '[2026-11-01 15:00+04, 2026-11-01 17:00+04)'::tstzrange
);