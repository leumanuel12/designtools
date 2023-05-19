const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Users = require("./models/usersModel");
const Cases = require("./models/casesModel");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//------------------------------------------------------------------------------
//ROUTES - USERS

//display all usernames
app.get("/users", async (req, res) => {
  //console.log("test");
  //res.send("test");
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

//display 1 user only
app.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await Users.find({ username });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

//create new username
app.post("/users/create", async (req, res) => {
  try {
    //console.log(req.body);
    const users = await Users.create(req.body);
    res.status(200).json(users);
  } catch (error) {
    //console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//------------------------------------------------------------------------------
//ROUTES - CASE STATUS

//display all cases
app.get("/cases", async (req, res) => {
  try {
    const cases = await Cases.find({});
    res.status(200).json(cases);
  } catch (error) {
    console.log(error);
  }
});

//display 1 case only
app.get("/cases/:caseid", async (req, res) => {
  try {
    const { caseid } = req.params;
    const case1 = await Cases.find({ caseid });
    res.status(200).json(case1);
  } catch (error) {
    console.log(error);
  }
});

//add new case
app.post("/cases/add", async (req, res) => {
  try {
    const newcase = await Cases.create(req.body);
    res.status(200).json(newcase);
  } catch (error) {
    //console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//update case status based from objectID not case id
app.put("/cases/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const case1 = await Cases.findByIdAndUpdate(id, req.body);

    /*
    note example:
    request url: http://localhost:5000/cases/6466cac395e14d159704f1de
    json: { "statuscode": 5 }
    */

    //throw if not found
    if (!case1) {
      res.status(404).json({
        message: `Case ID: ${id} is not found. Please check again.`,
      });
    }
    const updatedStatus = await Cases.findById(id);
    res.status(200).json(updatedStatus);
  } catch (error) {
    console.log(error);
  }
});

//delete case by objectid
app.delete("/cases/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const case1 = await Cases.findByIdAndDelete(id);

    //throw if not found
    if (!case1) {
      res.status(404).json({
        message: `Case ID: ${id} is not found. Please check again.`,
      });
    }

    res
      .status(200)
      .json({
        message: `Case ID: ${id} has been deleted in the tracker list.`,
      });
  } catch (error) {
    console.log(error);
  }
});

//------------------------------------------------------------------------------

//DB CONNECTION
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connection has been established successfully.");
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((e) => {
    console.log(e);
  });

//reference: https://www.youtube.com/watch?v=9OfL9H6AmhQ
