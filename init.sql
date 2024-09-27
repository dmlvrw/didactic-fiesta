CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  position VARCHAR(100)
);

INSERT INTO employees (name, position) VALUES
('张三', '经理'),
('李四', '工程师'),
('王五', '设计师');