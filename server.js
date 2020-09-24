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
const { request } = require("express");
const dbHelpers = require('./routes/helpers/dbHelpers.js');

const cookieSession = require("cookie-session");

app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}));


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
const storiesRoutes = require("./routes/stories");
const prospectsRoutes = require("./routes/prospects")
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/stories", storiesRoutes(db));
//app.use("/api/prospects", prospectsRoutes(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.use((req, res, next) => {
  db.query(`SELECT * FROM users WHERE id='${req.session.user_id}';`)
  .then (data => {
    //console.log('this is a test for data.rows', data.rows)
    let userObj = data.rows[0]
    const templateVars = {user: userObj}
    //console.log('test for templateVArs', templateVars)
    if (userObj) {
     req.user = userObj;
    }
    next()
  })
  .catch(err => {
    next()
  });
})


function requireAuth(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(403).send({message: "You have to be logged in to see this content!"});
  }
}



app.get("/", (req, res) => {
  const templateVars = {user: req.user }
 res.render("index", templateVars);
});



 app.get("/login", (req, res) => {
  const templateVars = {user: req.user }
   res.render("login", templateVars);
 });


 //needs passwords hashed
 app.post("/login", (req, res) => {
   const { username, password } = req.body
   console.log(username, password)
     db.query(`SELECT * FROM users WHERE username='${username}';`)
      .then (data => {
        const dbPassword = data.rows[0].password
        if (dbPassword === password) {
          req.session.user_id = data.rows[0].id
          res.redirect("/");
        } else {
          res.status(403).send({message: "Username or Password entered not valid!"});
        }
      })
  });



 app.get("/register", (req, res) => {
  const templateVars = { user: req.user }
   res.render("register", templateVars);
 });


app.post("/logout", (req, res) => {
 req.session.user_id = null;
 res.redirect("/");
});



app.get("/mystories", requireAuth, (req, res) => {
  // console.log("REQ.PARAMS ", req.params);
  // console.log("REQ.BODY ", req.body);
  // console.log("REQ.SESSION ", req.session);
  const templateVars = {user: req.user }
  res.render("mystories", templateVars);
})


app.get("/stories/:storyID", (req, res) => {
  let username = req.session.username;
  const storyID = Number(req.params.storyID)


   db.query(`SELECT * FROM users WHERE id='${req.session.user_id}';`)
   .then (data => {
     let user = data.rows[0];

     db.query(`SELECT * FROM stories WHERE id='${storyID}';`)
     .then (data => {
       let story = data.rows[0]

       console.log('SERVER STORY =>', story);

       const templateVars = {
         story,
         user,
         storyID
       }

      if (user) {
        console.log('test for templateVArs::::::::', templateVars)

         res.render("prospects", templateVars);
       }
       else {
         res.status(403).send({message: "You have to be logged in to see this content!"});
       }
       })
     .catch(err => {
       res.status(403).send({message: "You have to be logged in to see this content!"});
     });
   })

 });









app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
