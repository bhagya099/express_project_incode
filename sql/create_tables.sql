
<<<<<<< HEAD
=======

>>>>>>> f3ee4f313460d4be2c3188dc2feba037d0c4e1f1
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email     VARCHAR(200) NOT NULL,
    password CHAR(60) NOT NULL
);