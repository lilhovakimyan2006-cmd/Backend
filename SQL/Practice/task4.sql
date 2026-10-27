SELECT COUNT(*) AS total_products FROM products;

SELECT AVG(price) AS average_price FROM products;

SELECT category_id, SUM(stock_quantity) AS total_stock
FROM products GROUP BY category_id ORDER BY category_id;

SELECT category_id, SUM(stock_quantity) AS total_stock
FROM products
GROUP BY category_id
HAVING SUM(stock_quantity) > 100 ORDER BY category_id;  

SELECT product_id, SUM(quantity) AS total_ordered
FROM orders
GROUP BY product_id ORDER BY product_id;