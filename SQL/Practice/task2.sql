ALTER TABLE categories 
ADD COLUMN description TEXT,
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE categories ALTER COLUMN category_name TYPE TEXT;

ALTER TABLE categories ALTER COLUMN category_name SET NOT NULL;

ALTER TABLE categories 
ADD CONSTRAINT categories_category_name_unique
UNIQUE (category_name);

ALTER TABLE categories 
ADD CONSTRAINT categories_category_name_length_check
CHECK (LENGTH(category_name) >= 3);

ALTER TABLE categories
ALTER COLUMN is_active SET NOT NULL;

ALTER TABLE categories
ALTER COLUMN is_active SET DEFAULT TRUE;

INSERT INTO categories (category_name)
VALUES ('Sports');

SELECT category_id, category_name, is_active
FROM categories
WHERE category_name = 'Sports';