CREATE TABLE categories (
    category_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

INSERT INTO categories (category_name) 
VALUES 
    ('Electronics'),
    ('Furniture'),
    ('Stationery'),
    ('Books'),
    ('Toys');

SELECT * FROM categories ORDER BY category_id;

UPDATE categories SET category_name = 'Toys & Games' WHERE category_name = 'Toys';

INSERT INTO categories (category_name)
VALUES ('Temporary Category');

SELECT * FROM categories WHERE category_name = 'Temporary Category';

DELETE FROM categories WHERE category_name = 'Temporary Category';

SELECT * FROM categories WHERE category_name = 'Temporary Category';