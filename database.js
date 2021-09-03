const pgp = require("pg-promise")();

const database = "test_post";
// const connection = "postgres://postgres:1990@localhost:5432/database";
const connection = `postgres://riddhish:@localhost:5432/${database}`;

// Creating a new database instance from the connection details:
const db = pgp(connection);

module.exports = db;