SELECT authors.name, SUM(articles.views) AS total_views  
FROM authors
JOIN articles ON authors.author_id = articles.author_id
GROUP BY authors.author_id, authors.name;

SELECT authors.name, SUM(articles.views) AS total_views  
FROM authors
JOIN articles ON authors.author_id = articles.author_id
GROUP BY authors.author_id, authors.name
HAVING SUM(articles.views) > 1000;

SELECT articles.title, COUNT(comments.article_id) AS total_comment_count
FROM articles
LEFT JOIN comments ON articles.article_id = comments.article_id
GROUP BY articles.article_id, articles.title;

SELECT articles.title, COUNT(comments.article_id) AS total_comments
FROM articles
JOIN comments ON articles.article_id = comments.article_id
GROUP BY articles.article_id, articles.title
ORDER BY total_comments DESC
LIMIT 1;