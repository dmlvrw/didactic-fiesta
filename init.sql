CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  course_id INTEGER NOT NULL REFERENCES courses(id),
  user_name VARCHAR(100) NOT NULL,
  booking_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO courses (name) VALUES ('阳光高尔夫俱乐部'), ('月光高尔夫度假村');