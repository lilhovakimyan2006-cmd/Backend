CREATE TABLE books (
    book_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES authors(author_id),
    title TEXT NOT NULL,
    price NUMERIC(8, 2) NOT NULL CHECK (price > 0),
    pages INTEGER DEFAULT NULL CHECK (pages > 0),
    tags TEXT[],
    published_on DATE NOT NULL
);

INSERT INTO books (author_id, title, price, pages, tags, published_on)
VALUES
    (1, 'The Glass Harbor', 18.99, 320, '{fiction,mystery}', '2021-04-12'),
    (1, 'Winter Orchard', 14.50, 248, '{fiction,drama}', '2019-09-03'),
    (2, 'Signals in the Deep', 22.00, 410, '{science-fiction,adventure}', '2022-06-18'),
    (2, 'The Quiet Algorithm', 16.75, 296, '{technology,fiction}', '2020-11-07'),
    (4, 'A Map of Small Things', 12.25, 184, '{poetry,fiction}', '2018-02-21');

-- Expected error: violates check constraint "books_price_check"
INSERT INTO books (author_id, title, price, pages, tags, published_on)
VALUES (1, 'Invalid Price Test', -5, 100, '{test}', '2024-01-01');

-- Expected error: violates foreign key constraint "books_author_id_fkey"
INSERT INTO books (author_id, title, price, pages, tags, published_on)
VALUES (9999, 'Invalid Author Test', 10.00, 100, '{test}', '2024-01-01');