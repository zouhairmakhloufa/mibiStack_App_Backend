const router = require("express").Router();
let Comment = require("../models/Comment");


router.route("/post").post((req, res) => {
  const comment = new Comment(req.body);
  comment.save().then(() => {
    res.status(200).json({
      message: "added",
    });
  });
});

router.route("/get_by_lieu/:id").get((req, res) => {
  Comment.find({ id_lieu: req.params.id })
    .populate("id_user")
    .then((findedObject) => {
      res.status(200).json({
        comments: findedObject,
      });
    });
});

module.exports = router;
