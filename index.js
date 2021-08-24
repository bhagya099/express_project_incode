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

// for getting by user number
app.get("/users/0", (req, res) => {
    res.send(data.users[0]);
});

app.get("/users/1", (req, res) => {
    res.send(data.users[1]);
});
app.get("/users/2", (req, res) => {
    res.send(data.users[2]);
});

// getting schedule by id 
app.get('/users/0/schedules', (req, res) => {
    let id = 0;
    const found = data.schedules.some((schedule) => schedule.user_id === id);
    if (found) {
        res.send(data.schedules.filter((schedule) => schedule.user_id === id))
    } else {
        res.status(400).json({ msg: `No number with the id ${req.params.id}` });
    }
});


app.get('/users/2/schedules', (req, res) => {
    let id = 2;
    const found = data.schedules.some((schedule) => schedule.user_id === id);
    if (found) {
        res.send(data.schedules.filter((schedule) => schedule.user_id === id))
    } else {
        res.status(400).json({ msg: `No number with the id ${req.params.id}` });
    }
})


app.listen(PORT, () => {
    console.log(`you port is http://localhost:${PORT}`);
});