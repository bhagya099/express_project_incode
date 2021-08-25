const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const data = require("./data");
const bcrypt = require("bcrypt");
// body parser midlle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

// for getting by user id number
app.get("/users/:id", (req, res) => {
    res.send(data.users[req.params.id]);
});

// getting schedule by id
app.get("/users/:id/schedules", (req, res) => {
    // let id = 0;
    const found = data.schedules.some(
        (schedule) => schedule.user_id === Number(req.params.id)
    );
    if (found) {
        res.send(
            data.schedules.filter(
                (schedule) => schedule.user_id === Number(req.params.id)
            )
        );
    } else {
        res.status(400).json({ msg: `No number with the id ${req.params.id}` });
    }
});
// post request
app.post("/users", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = {
        firstname,
        lastname,
        email,
        password: hash,
    };
    data.users.push(newUser);
    res.json(newUser);
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`you port is http://localhost:${PORT}`);
});