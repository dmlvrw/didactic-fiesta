CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL
);

INSERT INTO bookings (name, date) VALUES
('Alice', '2023-10-01'),
('Bob', '2023-10-02');