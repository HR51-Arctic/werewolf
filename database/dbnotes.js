POSTGRESS Commands and stuff

//create a database - from TERMINAL
createdb databaseName

//enter postgres shell for database - from TERMINAL
psql databaseName


//-----------FROM POSTGRES SHELL COMMANDS BELOW

//create table - example
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(20) UNIQUE,
  userPassword VARCHAR(20),
  email VARCHAR(320) UNIQUE,
  numOfGames INTEGER NOT NULL DEFAULT 0,
  humanWins INTEGER NOT NULL DEFAULT 0,
  werewolfWins INTEGER NOT NULL DEFAULT 0
);

//create database
CREATE DATABASE databaseName;

//show databases
\l

//connect to a database
\c databaseName

//delete database
DROP DATABASE databaseName;

//show tables
\dt

//drop table
DROP TABLE tableName;

//insert values into a table
INSERT INTO tableName (field1, field2, field2) VALUES ('value1', 'value2', 111);

//basic query
SELECT * FROM tableName

//ORDER BY X --- ordering within a query
SELECT * FROM tableName ORDER BY id;

//update values
UPDATE tableName SET fieldName = value, WHERE fieldMatch = 'value';

//increment on update
UPDATE tableName SET fieldName = fieldName + 1 WHERE fieldMatch = 'value';

//increment more than one field - comma between each
UPDATE users SET numofgames = numofgames + 1, humanwins = humanwins + 1 WHERE username = 'willy';

//check email address of user
SELECT userpassword FROM users WHERE username = 'willy';

//run schema file
su postgres psql < database/schema.sql

//or
//if werewolf db isn't made yet
createdb werewolf
psql -h localhost -d werewolf -U yourcompuerusername < database/schema.sql