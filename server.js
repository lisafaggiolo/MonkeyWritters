// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');


const cookieSession = require("cookie-session");
const { request } = require("express");
app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}));

// ------------------------------------------

const stories = {
  "1": { title: "Breez", content: "Beatiful weather", userID: "userRandomID"},
  "2": { title: "weather", content: "nice weather", userID: "userRandomID"},
  "3": { title: "hot", content: "hot weather", userID: "user2RandomID"},
  "3": { title: "cold", content: "cold weather", userID: "user"}
};

const users = {
  "BobSmith": {
    id: 1,
    name: "Bob",
    username: "BobSmith",
    password: "purple",
    avatar_url: "/images/av1.png"
  },
  "SamSmith": {
    id: 2,
    name: "Sam",
    username: "SamSmith",
    password: "orange",
    avatar_url: "/images/av2.png"
  },
  "TonySmith": {
    id: 3,
    name: "Tony",
    username: "TonySmith",
    password: "black",
    avatar_url: "/images/av3.png"
  },
};



// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) => {
  const templateVars = {username: req.session.username}
 res.render("index", templateVars);
});


 app.get("/login", (req, res) => {
   const templateVars = {username: req.session.username}
   res.render("login", templateVars);
 });



 app.post("/login", (req, res) => {
   const { username, password } = req.body
   if (users[username].password === password) {
     req.session.username = username;
     res.redirect("/");
   } else {
     res.status(403).send({message: "Username or Password entered not valid!"});
   }
 });



 app.get("/register", (req, res) => {
   const templateVars = {username: req.session.username}
   res.render("register", templateVars);
 });


app.post("/logout", (req, res) => {
 req.session = null;
 res.redirect("/");
});


app.get("/mystories", (req, res) => {
 const templateVars = {username: req.session.username}
 res.render("mystories", templateVars);
})



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
