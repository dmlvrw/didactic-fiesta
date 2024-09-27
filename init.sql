CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

INSERT INTO courses (name) VALUES ('阳光高尔夫俱乐部'), ('月光高尔夫度假村');