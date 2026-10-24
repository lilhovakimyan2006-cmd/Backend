INSERT INTO books (title, author, price, in_stock, published_on, added_at)
VALUES
('The Hobbit', 'J.R.R. Tolkien', 15.99, TRUE, '1937-09-21', CURRENT_TIMESTAMP),
('1984', 'George Orwell', 12.50, TRUE, '1949-06-08', CURRENT_TIMESTAMP),
('The Little Prince', 'Antoine de Saint-Exupery', 9.99, FALSE, '1943-04-06', CURRENT_TIMESTAMP);

SELECT * FROM books;

SELECT title, price
FROM books
WHERE in_stock = TRUE;