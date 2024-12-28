const express = require('express');
const reqLogger = require('./utils/req-logger');
const { default: helmet } = require('helmet');
const compression = require('compression');
const mongoose = require("mongoose");
const errorHandler = require('./middlewares/error-handler.middleware');
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();


// ? app initialization
const app = express();


// ? middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(reqLogger);
app.use(compression());


// ? database connection config
const mongoUri = process.env.DB_URI;
mongoose.connect(mongoUri);

const db = mongoose.connection;
const sessionStore = new MongoStore({
    mongoUrl: mongoUri,
    collection: 'sessions'
})


// ? session config for express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


// ? routes
app.get("/", (req, res) => {
    if (req.session.viewCount) {
        req.session.viewCount += 1;
    } else {
        req.session.viewCount = 1;
    }

    res.send(`<h1>You have visited that page ${req.session.viewCount} times.</h1>`);
})

app.get("/admin", (req, res) => {
    res.send("Admin page");
})


// ? not found route
app.all("*", (req, res) => {
    res.send("Not Found");
})


// ? error handler middleware
app.use(errorHandler);


// ? database and server connected
db.on("open", () => {
    console.log("database is connected");

    app.listen(process.env.PORT || 3000, () => {
        console.log(`server is listening on port ${process.env.PORT || 3000}`);
    })
})