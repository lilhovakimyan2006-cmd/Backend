SELECT books.title, AVG(reviews.rating) AS average, COUNT(reviews.review_id) AS total_reviews
FROM books
LEFT JOIN reviews ON books.book_id = reviews.book_id
GROUP BY books.title, books.book_id;

SELECT books.title, AVG(reviews.rating) AS average, COUNT(reviews.review_id) AS total_reviews
FROM books
LEFT JOIN reviews ON books.book_id = reviews.book_id
GROUP BY books.title, books.book_id
HAVING AVG(reviews.rating) >= 4;

SELECT books.title, AVG(reviews.rating) AS average, COUNT(reviews.review_id) AS total_reviews
FROM books
LEFT JOIN reviews ON books.book_id = reviews.book_id
GROUP BY books.title, books.book_id
HAVING COUNT(reviews.review_id) >= 2;