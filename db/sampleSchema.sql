-- Try this app locally! Run the following commands in your terminal:

-- 1) Install postgres: `npm install postgres`

-- 2) Install node-postgres: `npm install pg`

-- 3) Login as a default user: `psql postgres`

-- 4) Run this schema file to create your database and tables:
  --a) `\i '<filepath to project folder>/boxfox/db/sampleSchema.sql'`
  --b) Yes, the single quotes are necessary

-- 5) Connect to the database: `\c sampleDatabase`
  -- a) Verify that the tables have been properly populated: `\dt`

-- 6) Launch the client and try out boxfox

-- Create database
DROP DATABASE IF EXISTS sampledb;
CREATE DATABASE sampledb;
\c sampledb;

-- Create two example tables
DROP TABLE IF EXISTS fav_foods_inv;
CREATE TABLE fav_foods_inv (
  id SERIAL UNIQUE PRIMARY KEY,
  food_name VARCHAR(24),
  inventory INT
);

DROP TABLE IF EXISTS pokemon_caught;
CREATE TABLE pokemon_caught (
  id SERIAL UNIQUE PRIMARY KEY,
  pokemon_name VARCHAR(24),
  trainer VARCHAR(12),
  num_caught INT
);

-- Fill example tables with starting data
INSERT INTO fav_foods_inv (food_name, inventory) VALUES ('surstromming', 3);
INSERT INTO fav_foods_inv (food_name, inventory) VALUES('mango', 6);

INSERT INTO pokemon_caught (pokemon_name, trainer, num_caught) VALUES('feraligatr', 'anthony', 1);
INSERT INTO pokemon_caught (pokemon_name, trainer, num_caught) VALUES('mewtwo', 'gabe', 2);
INSERT INTO pokemon_caught (pokemon_name, trainer, num_caught) VALUES('arctozolt', 'fox', 1);