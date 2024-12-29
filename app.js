const express = require('express');
const reqLogger = require('./middlewares/req-logger.middleware');
const { default: helmet } = require('helmet');
const compression = require('compression');
const mongoose = require("mongoose");
const errorHandler = require('./middlewares/error-handler.middleware');
const passport = require("./config/passport-jwt.config");
const {isAuthorized, authenticateJWT} = require('./middlewares/auth.middleware');
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


// ? Initialize Passport
app.use(passport.initialize());


// ? routes
app.get("/", authenticateJWT,isAuthorized('user'),(req, res) => {
    return res.send(`Hello ${req.user.username}!`);
});

app.use('/auth', require('./routes/auth.routes'));


// ? not found route
app.all("*", (req, res) => {
    res.status(404).send("404 Not Found");
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