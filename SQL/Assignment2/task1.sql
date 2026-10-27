CREATE TABLE authors (
    author_id INTEGER GENERATED ALWAYS AS IDENTITY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    country VARCHAR(50) DEFAULT 'Unknown',
    joined_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE authors
ADD CONSTRAINT authors_pkey PRIMARY KEY (author_id);

INSERT INTO authors (full_name, email, country, joined_at)
VALUES ('John Smith', 'john@gmail.com', 'USA', now());

INSERT INTO authors (full_name, email,  joined_at)
VALUES ('Tom Doe', 'tomDoe@gmail.com', now());

INSERT INTO authors (full_name, email, country, joined_at)
VALUES ('John McRae', 'john@gmail.com', 'USA', now());
--ERROR:  duplicate key value violates unique constraint "authors_email_key"
-- DETAIL:  Key (email)=(john@gmail.com) already exists.

--
INSERT INTO authors (full_name, email, country, joined_at)
VALUES ('John McRae', 'john.mcrae@gmail.com', 'USA', now());