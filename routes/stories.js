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
        //console.log(data.rows);
        res.json({ stories });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  router.post("/:storyID/prospects", (req, res) => {
   // console.log("STORYID/prospects")
    const user_id = req.session.user_id;
    const { contributeText } = req.body;

    const storyID = req.params.storyID;

    //console.log("STORIES /:storyID/prospects", storyID);

    let prospects = {
      content : contributeText,
      user_id,
      story_id : req.params.storyID
    }

    console.log("PROSPECTS STORIES", prospects);
    dbHelpers.addProspects(prospects)
    .then(() => {
      //console.log("DATA IN PROSPECTS", data);
      res.redirect(`/stories/${storyID}`)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


   router.get("/mystories", (req, res) => { 
     console.log("REQ.PARAMS ", req.params);
     console.log("REQ.BODY ", req.body);
     console.log("REQ.SESSION ", req.session);
    
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
    console.log("mystories - POST")
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

      res.redirect('/mystories')
    })
    .catch(err => {
      console.err("error =>", err.message)
    });


  });



  router.get("/:storyID", (req, res) => {
    console.log("STORYID")
    console.log('req.params.storyID', req.params.storyID)
    db.query(`SELECT * FROM prospects WHERE prospects.story_id = ${req.params.storyID};`)
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


  return router;
};

