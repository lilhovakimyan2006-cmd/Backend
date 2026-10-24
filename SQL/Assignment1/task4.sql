CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    author VARCHAR(100),
    price NUMERIC(8, 2),
    in_stock BOOLEAN,
    published_on DATE,
    added_at TIMESTAMP
);