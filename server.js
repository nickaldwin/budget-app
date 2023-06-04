const express = require("express");
const app = ecpress();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");

//use .env file in conmfig folder
require("dotenv").config({path:"./config/.env"});

// Passport config
require("./config/passport")(passport);

//connect to database
connectDB();

//using ejs for views
app.set("view engine", "ejs");

//Body Parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Logging
app.use(logger("dev"));

//use forms for put / delete
app.use(methodOverride("_method"));

//steup sessions  - sessions stored MongoDB
app.use(
    session({
        secret: "Keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.Connection});
    })
);

//passport middleware
app,use(passport.initialize);
app.use(passport.session());

//use flash
app.use(flash());

//setup routes for which the server Is listening
app.use("/", mainRoutes);
app.use("/post", postRoutes);
app.use("/todos", todoRoutes);
app.use("/budget", budgetRoutes);
//server runnig

app.listen(process.env.PORT, () => {
    console.log("Server is running, you better catch it!");
})















