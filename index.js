const express = require("express");
const app = express();
const PORT = 5000;
const data = require("./data");

// routes

app.get("/", (req, res) => {
    res.send(`<h1>Welcome to our schedule website</h1>`);
});

app.get("/users", (req, res) => {
    res.send(data.users);
});

app.get("/schedules", (req, res) => {
    res.send(data.schedules);
});

app.listen(PORT, () => {
    console.log(`you port is http://localhost:${PORT}`);
});