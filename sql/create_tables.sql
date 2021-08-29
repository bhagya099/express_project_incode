

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email     VARCHAR(200) NOT NULL,
    password CHAR(60) NOT NULL
);