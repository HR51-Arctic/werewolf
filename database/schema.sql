DROP DATABASE IF EXISTS werewolf;
CREATE DATABASE werewolf;
\c werewolf;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE,
    userPassword VARCHAR(20),
    email VARCHAR(320) UNIQUE,
    numOfGames INTEGER NOT NULL DEFAULT 0,
    wins INTEGER NOT NULL DEFAULT 0,
    humanWins INTEGER NOT NULL DEFAULT 0,
    werewolfWins INTEGER NOT NULL DEFAULT 0
);

INSERT INTO users(username, userpassword, email)
VALUES ('taco', '123hello', 'tacomaster@gmail.com');
INSERT INTO users(username, userpassword, email)
VALUES ('willy', 'freemeplz', 'lemmego@gmail.com');
INSERT INTO users(username, userpassword, email)
VALUES (
        '100andstillkickin',
        'hereigo200',
        'originalgangster@gmail.com'
    );
INSERT INTO users(username, userpassword, email)
VALUES (
        'justask8erboi',
        'shesaidseeyalaterboy',
        'crymyself2sleep@gmail.com'
    );
INSERT INTO users(username, userpassword, email)
VALUES (
        'notahacker',
        'itotallyam',
        'supernerd555@gmail.com'
    );
