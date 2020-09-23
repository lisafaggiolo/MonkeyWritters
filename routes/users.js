/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dbHelpers = require('./helpers/dbHelpers.js');
const cookieSession = require("cookie-session");
const app        = express();

app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}));






module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM users`;
    db.query(query)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/register', (req, res) => {
    const { name, avatar, username, password } = req.body;
    //if the username has already been taken return to register page
    //if the password field is empty - Oops add a password
    let user = {
      name,
      avatar,
      username,
      password
    }
     
    dbHelpers.addUser(user)
    .then(() => {
      req.session.username = user.username;
      res.redirect('/')
    })
    .catch(err => {
      console.err("error =>", err.message)
    });

  })
  return router;
};
