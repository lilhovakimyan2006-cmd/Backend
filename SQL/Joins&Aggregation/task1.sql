CREATE TABLE authors (
    author_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT
);

CREATE TABLE articles (
    article_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    author_id INTEGER REFERENCES authors(author_id),
    published_on DATE NOT NULL,
    views INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE comments (
    comment_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    article_id INTEGER REFERENCES articles(article_id),
    commenter_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO authors (name, bio)
VALUES 
    ('Maria Chen', 'Writes about frontend performance'),
    ('David Okafor', 'Backend and databases'),
    ('Sana Malik', 'DevOps and infrastructure'),
    ('Tom Reyes', 'Career advice for developers');

SELECT * FROM authors;

INSERT INTO articles (title, author_id, published_on, views) 
VALUES 
    ('Speeding Up You CSS', 1, '2026-01-05', 820),
    ('Lazy Loading Images', 1, '2026-01-20', 410),
    ('Indexing 101', 2, '2026-01-10', 1500),
    ('Understanding Joins', 2, '2026-02-01', 2100),
    ('Zero-Downtime Deploys', 3, '2026-01-15', 690),
    ('Docker for Begginers', 3, '2026-02-05', 950),
    ('Writing a Great Resume', 4, '2026-01-25', 300),
    ('Acting the Interview', 4, '2026-02-10', 0);

SELECT * FROM articles

INSERT INTO comments (article_id, commenter_name)
VALUES 
    (1, 'Alex'),
    (1, 'Priya'),
    (3, 'Jordan'),
    (3, 'Sam'),
    (3, 'Lee'),
    (4, 'Alex'),
    (4, 'Priya'),
    (4, 'Jordan'),
    (4, 'Sam'),
    (5, 'Lee'),
    (6, 'Alex'),
    (7, 'Priya');

SELECT * FROM comments;

SELECT articles.title, authors.name, articles.views
FROM authors
INNER JOIN articles
ON authors.author_id = articles.author_id;

SELECT articles.title, comments.commenter_name
FROM articles 
LEFT JOIN comments 
    ON articles.article_id = comments.article_id; 

INSERT INTO authors (name, bio) 
VALUES ('Jane Smith', 'A&DS');

SELECT authors.name, articles.title
FROM authors
LEFT JOIN articles ON authors.author_id = articles.author_id;

DELETE FROM authors 
WHERE name = 'Jane Smith';