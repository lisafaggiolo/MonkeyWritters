












router.post("/storyID/prospects/:prospectsID", (req, res) => {
    const user_id = req.session.user_id;
    const storyID = req.params.storyID;
    const prospectsID = req.params.prospectsID

    db.query(`SELECT * prospects where prospects.id = prospectsID;`)
    .then(data => {

      res.data.rows
      UPDATE stories
      SET content = CONCATE(content, data.content)
      WHERE id = storyID;
      update prospects set approved = 1 WHERE id = prospectsID;
      res.json({ stories });

    })
  });
  return router;
