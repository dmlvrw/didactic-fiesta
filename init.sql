CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  date DATE NOT NULL
);

INSERT INTO bookings (name, email, date) VALUES
('Alice', 'alice@example.com', '2023-10-01'),
('Bob', 'bob@example.com', '2023-10-02');
