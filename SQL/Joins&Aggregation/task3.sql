CREATE TABLE writers (
    writer_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    country TEXT
);

CREATE TABLE books (
    book_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    writer_id INTEGER REFERENCES writers(writer_id),
    published_year INTEGER,
    price NUMERIC(6,2) NOT NULL CHECK (price > 0)
);

CREATE TABLE reviews (
    review_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id INTEGER REFERENCES books(book_id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT
);

INSERT INTO writers (name, country)
VALUES
    ('Elena Vasquez', 'Spain'),
    ('Kenji Watanabe', 'Japan'),
    ('Grace Okonkwo', 'Nigeria');

INSERT INTO books (title, writer_id, published_year, price)
VALUES
    ('The Long Horizon', 1, 2019, 18.99),
    ('Small Fires', 1, 2022, 16.50),
    ('Paper Lanterns', 2, 2018, 14.00),
    ('The Quiet Station', 2, 2021, 19.50),
    ('River of Names', 3, 2020, 15.75),
    ('Unfinished Maps', 3, 2023, 21.00);

INSERT INTO reviews (book_id, rating)
VALUES
    (1, 5),
    (1, 4),
    (1, 5),
    (2, 3),
    (2, 4),
    (3, 5),
    (3, 5),
    (4, 2),
    (4, 3),
    (5, 4),
    (5, 5),
    (5, 4);

SELECT * FROM writers;
SELECT * FROM books;
SELECT * FROM reviews;

SELECT books.title, writers.name, books.price
FROM books
JOIN writers ON books.writer_id = writers.writer_id;

SELECT books.title, reviews.rating
FROM books
LEFT JOIN reviews ON books.book_id = reviews.book_id;

SELECT writers.name, COUNT(books.writer_id) AS total_books
FROM writers
JOIN books ON writers.writer_id = books.Writer_id
GROUP BY writers.name;