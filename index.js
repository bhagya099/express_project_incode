const express = require("express");
const app = express();
const PORT = process.env.PORT || 5009;
const data = require('./data');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./database');

// body parser midlle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

// for css and js file
app.use(express.static(path.join(__dirname, 'public')));
// routes
// rendering the index page
app.get('/', (req, res) => {
    // res.send(`<h1>Welcome to our schedule website</h1>`);
    res.render('pages/index');
});

// get users from database
app.get('/users', (req, res) => {
    db.any('SELECT * FROM users;')
        .then((users) => {
            console.log(users);
            res.render('pages/users', {
                users,
            });
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
});

app.get('/schedules', (req, res) => {
    db.any('SELECT * FROM schedules;')
        .then((schedules) => {
            console.log(schedules);
            res.render('pages/schedules', {
                schedules,
            });
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
});

// for getting users by user id number
app.get('/users/:id', (req, res) => {
    //   getting the form page
    if (req.params.id == 'new') {
        res.render('pages/form');
    } else {
        // getting the users details using id
        res.render('pages/user-id', {
            userid: data.users[req.params.id],
            id: req.params.id,
        });
    }
});

// getting schedule by id
app.get('/users/:id/schedules', (req, res) => {
    // let id = 0;
    const found = data.schedules.some(
        (schedule) => schedule.user_id === Number(req.params.id)
    );
    if (found) {
        res.render('pages/schedules', {
            schedules: data.schedules.filter(
                (schedule) => schedule.user_id === Number(req.params.id)
            ),
        });
    } else {
        res.status(400).json({ msg: `No number with the id ${req.params.id}` });
    }
});
app.get('/schedules/new', (req, res) => {
    res.render('pages/create_schedules');
});

app.post('/users', (req, res) => {
    console.log(req.body);
    db.none(
            'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);', [req.body.firstname, req.body.lastname, req.body.email, req.body.password]
        )
        .then(() => {
            res.redirect('/users');
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        });
});

// /new rote to post schedule
app.post('/schedules/new', (req, res) => {
    console.log(req.body);
    db.none(
            'INSERT INTO schedules (username, day, start_time, end_time) VALUES ($1, $2, $3, $4);', [req.body.username, req.body.day, req.body.start_time, req.body.end_time]
        )
        .then(() => {
            res.redirect('/schedules');
        })
        .catch((error) => console.log(error));
});

app.listen(PORT, () => {
    console.log(`you port is http://localhost:${PORT}`);
});