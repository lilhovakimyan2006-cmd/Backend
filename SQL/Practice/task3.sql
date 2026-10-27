CREATE TABLE products (
    product_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_name TEXT NOT NULL,
    price NUMERIC(8, 2) NOT NULL CHECK (price > 0),
    category_id INTEGER,
    stock_quantity INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE orders (
    order_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    order_date DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO products
    (product_name, price, category_id, stock_quantity)
VALUES
    ('Wireless Mouse', 19.99,
        (SELECT category_id FROM categories
         WHERE category_name = 'Electronics'), 150),

    ('Mechanical Keyboard', 49.99,
        (SELECT category_id FROM categories
         WHERE category_name = 'Electronics'), 80),

    ('Standing Desk', 249.00,
        (SELECT category_id FROM categories
         WHERE category_name = 'Furniture'), 30),

    ('Office Chair', 129.50,
        (SELECT category_id FROM categories
         WHERE category_name = 'Furniture'), 45),

    ('Notebook Pack', 4.99,
        (SELECT category_id FROM categories
         WHERE category_name = 'Stationery'), 300),

    ('Gel Pens (12-pack)', 6.50,
        (SELECT category_id FROM categories
         WHERE category_name = 'Stationery'), 220),

    ('PostgreSQL Handbook', 39.00,
        (SELECT category_id FROM categories
         WHERE category_name = 'Books'), 60),

    ('SQL Cookbook', 34.00,
        (SELECT category_id FROM categories
         WHERE category_name = 'Books'), 40),

    ('Building Blocks', 24.99,
        (SELECT category_id FROM categories
         WHERE category_name = 'Toys & Games'), 60),

    ('Desk Lamp', 15.50, NULL, 0);


SELECT * FROM products ORDER BY product_id;

INSERT INTO orders (product_id, quantity, order_date)
VALUES
    ((SELECT product_id FROM products
      WHERE product_name = 'Wireless Mouse'), 2, '2026-01-05'),

    ((SELECT product_id FROM products
      WHERE product_name = 'Wireless Mouse'), 1, '2026-01-12'),

    ((SELECT product_id FROM products
      WHERE product_name = 'Mechanical Keyboard'), 1, '2026-01-12'),

    ((SELECT product_id FROM products
      WHERE product_name = 'Standing Desk'), 1, '2026-01-20'),

    ((SELECT product_id FROM products
      WHERE product_name = 'Office Chair'), 2, '2026-01-22'),

    ((SELECT product_id FROM products
      WHERE product_name = 'Notebook Pack'), 5, '2026-02-01'),

    ((SELECT product_id FROM products
      WHERE product_name = 'Gel Pens (12-pack)'), 3, '2026-02-01'),

    ((SELECT product_id FROM products
      WHERE product_name = 'PostgreSQL Handbook'), 1, '2026-02-10'),

    ((SELECT product_id FROM products
      WHERE product_name = 'Wireless Mouse'), 3, '2026-02-15'),

    ((SELECT product_id FROM products
      WHERE product_name = 'Gel Pens (12-pack)'), 2, '2026-02-18');

SELECT * FROM orders ORDER BY order_id;

SELECT p.product_name, p.price, c.category_name 
FROM products AS p
INNER JOIN categories AS c ON p.category_id = c.category_id;

SELECT product_id, product_name, category_id
FROM products;

SELECT category_id, category_name
FROM categories;

SELECT p.product_name, p.price, c.category_name
FROM products AS p
LEFT JOIN categories AS c ON p.category_id = c.category_id;

SELECT p.product_name, COUNT(o.order_id) AS order_count
FROM products AS p
LEFT JOIN orders AS o 
    ON p.product_id = o.product_id
GROUP BY p.product_id, p.product_name
ORDER BY p.product_id;