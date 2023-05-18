const router = require("express").Router();
let CaseStatus = require("../models/casestatus.models");

//GET
router.route("/").get((req, res) => {
  CaseStatus.find()
    .then((users) => res.json(users))
    .catch((e) => res.status(400).json("Error Message: ", e));
});

//POST - ADD NEW USER
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const caseid = req.body.caseid;
  const statuscode = req.body.statuscode;

  const newCaseStatus = new CaseStatus({
    username,
    caseid,
    statuscode,
  });

  newCaseStatus
    .save()
    .then(() => res.json("Username successfully created."))
    .catch((e) => res.status(400).json("Error Message: ", e));
});

module.exports = router;
