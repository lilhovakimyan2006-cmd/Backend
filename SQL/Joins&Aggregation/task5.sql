SELECT writers.name, AVG(reviews.rating) AS average_rating
FROM writers
JOIN books ON writers.writer_id = books.writer_id
JOIN reviews ON books.book_id = reviews.book_id
GROUP BY writers.name, writers.writer_id; 

SELECT writers.name, AVG(reviews.rating) AS average_rating
FROM writers
JOIN books ON writers.writer_id = books.writer_id
JOIN reviews ON books.book_id = reviews.book_id
GROUP BY writers.name, writers.writer_id
HAVING AVG(reviews.rating) > 4;

-- We need to join three tables because we need the writer’s name,
-- their books, and the ratings of those books to calculate the writer’s average rating. 
-- In Task 4, joining only two tables was enough because we only needed to calculate the 
-- average rating for each book, without needing the writer’s information.