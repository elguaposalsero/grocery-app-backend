DROP TABLE IF EXISTS groceries;

CREATE TABLE groceries (
  id serial PRIMARY KEY,
  item_name varchar (30) UNIQUE NOT NULL,
  purchased boolean DEFAULT FALSE
);

INSERT INTO groceries 
  (item_name)
  VALUES ('Cucumbers'),
         ('Tomatoes');