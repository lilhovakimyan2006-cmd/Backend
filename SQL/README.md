# PostgreSQL Practice Assignment1

## Overview

This project is a hands-on PostgreSQL practice assignment focused on database roles, authentication, database creation, table creation, data insertion, and access permissions.

## Objectives

- Create PostgreSQL roles with different login privileges.
- Configure authentication for database users.
- Create a new database.
- Create a table using different PostgreSQL data types.
- Insert and retrieve records.
- Grant specific permissions to a role and verify access restrictions.

## Tasks Completed

### Task 1: Create a Role Without Login

Created the `library_guest` role without the `LOGIN` privilege.

Verified that the role cannot connect to PostgreSQL.

### Task 2: Create a Role With Login

Configured the `library_staff` role with the `LOGIN` privilege and a password.

Successfully connected to PostgreSQL using this role.

### Task 3: Create a Database

Created a database named `library_db`.

### Task 4: Create the Books Table

Created a `books` table with the following columns:

| Column | Data Type | Description |
|---|---|---|
| `book_id` | `SERIAL PRIMARY KEY` | Unique, automatically generated book ID |
| `title` | `VARCHAR(150)` | Book title |
| `author` | `VARCHAR(100)` | Author's name |
| `price` | `NUMERIC(8, 2)` | Book price |
| `in_stock` | `BOOLEAN` | Indicates whether the book is in stock |
| `published_on` | `DATE` | Publication date |
| `added_at` | `TIMESTAMP` | Date and time the record was added |

### Task 5: Insert and Retrieve Data

Inserted three sample books into the `books` table.

Executed the following queries:

```sql
SELECT * FROM books;

SELECT title, price
FROM books
WHERE in_stock = TRUE;
```

The first query retrieves all books. The second retrieves only the titles and prices of books currently in stock.

### Task 6: Grant SELECT Permission Only

Granted the `library_staff` role permission to read records from the `books` table:

```sql
GRANT SELECT ON TABLE books TO library_staff;
```

**Verification results:**

- `SELECT` executed successfully.
- `INSERT` failed with `permission denied for table books`, as expected.

This confirmed that `library_staff` can read records but cannot insert new records into the table.

## Technologies Used

- PostgreSQL 16
- SQL
- `psql` command-line tool
- macOS Terminal

## Key Concepts Practiced

- Roles and user privileges
- Login authentication
- Database and table creation
- PostgreSQL data types
- Primary keys and `SERIAL`
- Data insertion and retrieval
- `GRANT` permissions
- Access control and permission verification

## Conclusion

This assignment provided practical experience with PostgreSQL role management, authentication, database and table creation, SQL queries, and access control. All six tasks, including the bonus permission test, were completed successfully.

# Assignment 2 — PostgreSQL

## Overview

This assignment focuses on PostgreSQL database management, indexing, range types, exclusion constraints, and data validation using CHECK constraints.

## Tasks Completed

### Task 1 — Database Setup
Created and populated the database tables required for the assignment.

### Task 2 — Data Relationships
Worked with primary keys, foreign keys, and relationships between authors and books.

### Task 3 — B-tree Index
Created a B-tree index on the `published_on` column of the `books` table to support date-based queries.

```sql
CREATE INDEX idx_books_published_on
ON books USING btree (published_on);
```

Used `EXPLAIN ANALYZE` to inspect query execution. PostgreSQL selected a sequential scan because the table contained only a small number of rows.

### Task 4 — GIN Index
Created a GIN index on the `tags` array column to support array-based searches.

```sql
CREATE INDEX idx_books_tags
ON books USING GIN (tags);
```

Tested the index with an array containment query:

```sql
SELECT title
FROM books

# PostgreSQL Practice — Tasks 1–6

## Overview

This project demonstrates fundamental PostgreSQL concepts through a simple product management and order tracking database. It covers table creation, data manipulation, joins, aggregate functions, and foreign key constraints.

## Database Tables

### 1. `categories`
Stores product categories.

- `category_id` — Primary key generated using identity.
- `category_name` — Category name.
- `description` — Optional category description.
- `is_active` — Indicates whether the category is active.

### 2. `products`
Stores product information.

- `product_id` — Primary key generated using identity.
- `product_name` — Product name.
- `price` — Product price, which must be greater than zero.
- `category_id` — References `categories(category_id)`.
- `stock_quantity` — Available stock quantity.

### 3. `orders`
Stores product order information.

- `order_id` — Primary key generated using identity.
- `product_id` — References `products(product_id)`.
- `quantity` — Number of units ordered, which must be greater than zero.
- `order_date` — Order date, defaulting to the current date.

## Tasks Completed

### Task 1 — Table Creation and Data Manipulation
- Created the `categories` table.
- Inserted, updated, selected, and deleted records.
- Added and modified columns.
- Applied `NOT NULL`, `UNIQUE`, `CHECK`, and `DEFAULT` constraints.

### Task 2 — Products and Orders
- Created the `products` and `orders` tables.
- Inserted sample product and order data.
- Used identity columns and default values.

### Task 3 — JOIN Operations
- Used `INNER JOIN` to retrieve products with their categories.
- Used `LEFT JOIN` to include products without categories.
- Joined products with orders to examine order records.
- Compared `INNER JOIN` and `LEFT JOIN`.

### Task 4 — Aggregate Functions
- Used `COUNT()` to count products.
- Used `AVG()` to calculate the average product price.
- Used `SUM()` to calculate total stock.
- Used `GROUP BY` to group products by category.
- Used `HAVING` to filter aggregated results.
- Calculated total ordered quantities for each product.

### Task 5 — JOIN and Aggregation
- Calculated total revenue for each category using `SUM(quantity * price)`.
- Counted orders for each product using `COUNT(order_id)`.
- Included products with zero orders using `LEFT JOIN`.
- Filtered categories by total revenue using `HAVING`.

### Task 6 — Foreign Keys and Referential Integrity
- Added a foreign key from `products.category_id` to `categories.category_id`.
- Added a foreign key from `orders.product_id` to `products.product_id`.
- Tested the rejection of invalid category references.
- Tested the prevention of deleting categories referenced by existing products.
- Examined how foreign keys maintain referential integrity.

## SQL Concepts Practiced

- `CREATE TABLE`
- `INSERT`, `UPDATE`, `DELETE`, `SELECT`
- `ALTER TABLE`
- Primary keys and identity columns
- `NOT NULL`, `UNIQUE`, `CHECK`, and `DEFAULT`
- `FOREIGN KEY` and `REFERENCES`
- `INNER JOIN` and `LEFT JOIN`
- `COUNT()`, `SUM()`, and `AVG()`
- `GROUP BY`, `HAVING`, and `ORDER BY`
- Referential integrity

## How to Run

1. Install PostgreSQL.
2. Create a database.
3. Connect to the database using `psql`.
4. Execute the SQL commands in the order of the tasks.
5. Verify the results using `SELECT` queries.

Example:

```bash
psql -U your_username -d your_database
```

## Key Learnings

- Joins combine related data from multiple tables.
- Aggregate functions summarize data.
- `GROUP BY` creates groups, while `HAVING` filters those groups.
- `LEFT JOIN` preserves all records from the left table, including records without matches.
- `FOREIGN KEY` constraints prevent invalid references and protect data integrity.

## Technologies

- PostgreSQL
- SQL
- `psql` command-line interface