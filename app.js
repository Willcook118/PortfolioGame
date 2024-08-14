const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const ejs = require('ejs');

const { db } = require('./database/db');

const app = express();
const port = 3000;

// Middleware stuff for parsing body, creating sessions and helping serve the static files such as html and css
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(session({
    secret: 'your_secret_key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.username = req.session.username;
    res.locals.level = req.session.level;
    res.locals.userClass = req.session.userClass;
    res.locals.user = req.session.user;
    res.locals.monster = req.session.monster;
    next();
});

// Set EJS as the template engine for the views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/authentication'); 
const gameRoutes = require('./routes/game');
const mapRoutes = require('./routes/maps');


app.use('/auth', authRoutes);
app.use('/game', gameRoutes);
app.use('/maps', mapRoutes);

module.exports = app;