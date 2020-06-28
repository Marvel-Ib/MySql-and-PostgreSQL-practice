CREATE DATABASE todo_database;
--commnets
-- \c into todo_daatabae
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);