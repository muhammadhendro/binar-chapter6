var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/user_game");
var userBiodata = require("./routes/user_game_biodata");
var usersHistory = require("./routes/user_game_history");
var app = express();

app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user_game", usersRouter);
app.use("/user_game_biodata", userBiodata);
app.use("/user_game_history", usersHistory);

module.exports = app;
