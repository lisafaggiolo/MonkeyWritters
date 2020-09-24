/*
 * All routes for prospects are defined here
 * Since this file is loaded in server.js into api/stories,
 * these routes are mounted onto /stories
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

  router.get("/stories/:id", (req, res) => {
    db.query(`SELECT * FROM prospects WHERE prospects.story_id = ${req.params.id};`)
      .then(data => {
        const prospects = data.rows;
        res.json({ prospects });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("stories/:id/prospects", (req, res) => {
    const user_id = req.session.user_id;
    const { text } = req.body;

    let prospects = {
      content : text,
      user_id,
      story_id : req.params.id
    }
    dbHelpers.addProspects(prospects)
    .then((data) => {
      console.log("DATA IN PROSPECTS", data);
      res.redirect('/stories/:id')
    })
    .catch(err => {
      console.err("error =>", err.message)
    });


  });
  return router;
};

