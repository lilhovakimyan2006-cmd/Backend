CREATE INDEX idx_books_tags
ON books USING GIN (tags);

EXPLAIN ANALYZE
SELECT title FROM books
WHERE tags @> ARRAY['fiction'];