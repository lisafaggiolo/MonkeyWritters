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
    db.query(`select stories.*,users.username as owner, users.avatar_url from stories join users on (users.id = stories.user_id);`)
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
    db.query(`select stories.*,users.username as owner, users.avatar_url from stories join users on (users.id = stories.user_id) where user_id ='${req.session.user_id}';`)
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
    .catch(err => {
      console.err("error =>", err.message)
    });


  });
  return router;
};

router.post('/api/stories/mystories/', (req, res) => {
  const { content, created_at, user_id,story_id} = req.body;
  let contributor = {
    content,
    created_at,
    user_id,
    story_id
  }

  dbHelpers.addProspects(contributor)
  .then(() => {
    req.session.content = contributor.content;
    res.redirect('/')
  })

})
return router;



