ALTER TABLE authors
ADD COLUMN website TEXT;

UPDATE authors
SET website = 'https://johnsmith.example.com'
WHERE author_id = 1;

UPDATE authors
SET website = 'https://tomdoe.example.com'
WHERE author_id = 2;

SELECT author_id, full_name, website
FROM authors;

ALTER TABLE authors
ADD CONSTRAINT website_is_secure
CHECK (
    website IS NULL OR website LIKE 'https://%'
);

INSERT INTO authors (full_name, email, website)
VALUES (
    'Test Author',
    'test-author@example.com',
    'http://insecure.example.com'
);