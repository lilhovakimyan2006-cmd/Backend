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