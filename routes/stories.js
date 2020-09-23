/*
 * All routes for stories are defined here
 * Since this file is loaded in server.js into api/stories,
 *   these routes are mounted onto /stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

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



