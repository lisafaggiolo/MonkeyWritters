/*
 * All routes for stories are defined here
 * Since this file is loaded in server.js into api/stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dbHelpers = require('./helpers/dbHelpers.js');
const cookieSession = require("cookie-session");
const { text } = require('body-parser');
const app        = express();

app.use(cookieSession({
  name: "session",
  keys: ["key1", "key2"]
}));



module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM stories;`)
      .then(data => {
        const stories = data.rows;
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/mystories", (req, res) => {
    db.query(`SELECT * FROM stories WHERE user_id='${req.session.user_id}';`)
      .then(data => {
        const stories = data.rows;
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/mystories", (req, res) => {
    const user_id = req.session.user_id;
    const { title, text } = req.body;
    
    let story = {
      title,
      content : text,
      closed: false,
      user_id
    }
    
    dbHelpers.addStory(story)
    .then(() => {
    
      res.redirect('/')
    })
    
    // const {username, user_id} = req.session;
    // const {text} = req.body;

  })
  return router;
};

  

