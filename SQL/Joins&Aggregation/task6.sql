SELECT authors.name, SUM(articles.views) AS total_views
FROM authors
JOIN articles ON authors.author_id = articles.author_id
GROUP BY authors.author_id, authors.name
ORDER BY total_views DESC
LIMIT 1;

SELECT books.title, AVG(reviews.rating) AS average_rating,
       COUNT(reviews.review_id) AS total_reviews
FROM books
JOIN reviews ON books.book_id = reviews.book_id
GROUP BY books.book_id, books.title
HAVING COUNT(reviews.review_id) >= 2
ORDER BY average_rating DESC
LIMIT 1;

-- I found the library task more difficult because I had to calculate the 
-- average rating for each book and use `HAVING` to exclude books with 
-- fewer than two reviews. In the blog task, I only needed to calculate 
-- the total views for each author and sort the results in descending 
-- order. Both tasks required grouping and aggregation, but the library 
-- task had an additional condition to check.