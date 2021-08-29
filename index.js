const express = require("express");
const app = express();
const PORT = process.env.PORT || 4009;
const data = require("./data");
const bcrypt = require("bcrypt");

// body parser midlle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ejs

app.set("view engine", "ejs");
app.use(express.static("public"));

// routes
// rendering the index page
app.get("/", (req, res) => {
    // res.send(`<h1>Welcome to our schedule website</h1>`);
    res.render("pages/index");
});

app.get("/users", (req, res) => {
    res.render("pages/users", {
        users: data.users,
    });
});

app.get("/schedules", (req, res) => {
    res.render("pages/schedules", {
        schedules: data.schedules,
    });
});

// for getting users by user id number
app.get("/users/:id", (req, res) => {
    //   getting the form page
    if (req.params.id == "new") {
        res.render("pages/form");
    } else {
        // getting the users details using id
        res.render("pages/user-id", {
            userid: data.users[req.params.id],
            id: req.params.id,
        });
    }
});

// getting schedule by id
app.get("/users/:id/schedules", (req, res) => {
    // let id = 0;
    const found = data.schedules.some(
        (schedule) => schedule.user_id === Number(req.params.id)
    );
    if (found) {
        res.render("pages/schedules", {
            schedules: data.schedules.filter(
                (schedule) => schedule.user_id === Number(req.params.id)
            ),
        });
    } else {
        res.status(400).json({ msg: `No number with the id ${req.params.id}` });
    }
});
app.get("/schedules/new", (req, res) => {
    res.render("pages/create_schedules");
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

    if (!newUser.firstname ||
        !newUser.lastname ||
        !newUser.email ||
        !newUser.password
    ) {
        console.log(newUser);
        return res.status(400).json({ msg: "Please fill all the field" });
    }
    console.log(newUser);
    data.users.push(newUser);
    // res.json(newUser);
    // console.log(req.body);
    // console.log(newUser);
    // res.json(req.body);
    // res.json(data.users);
    res.redirect("/users");
});

app.post("/schedules", (req, res) => {
    const { start_at, end_at } = req.body;
    const newSchedule = {
        start_at: start_at,
        end_at: end_at,
    };
    data.schedules.push(newSchedule);
    // res.json(data.schedules);
    res.redirect("/schedules");
});

app.listen(PORT, () => {
    console.log(`you port is http://localhost:${PORT}`);
});