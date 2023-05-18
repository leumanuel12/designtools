const router = require("express").Router();
let Users = require("../models/users.models");

//GET
router.route("/").get((req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((e) => res.status(400).json("Error Message: " + e));
});

//POST - ADD NEW USER
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new Users({ username });

  newUser
    .save()
    .then(() => res.json("Username successfully created."))
    .catch((e) => res.status(400).json("Error Message: " + e));
});

module.exports = router;
