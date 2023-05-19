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

//ROUTES - USERS

//display all usernames
app.get("/users", async (req, res) => {
  //console.log("test");
  //res.send("test");
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    //console.log(error);
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

//ROUTES - CASE STATUS

//display all cases
app.get("/cases", async (req, res) => {
  try {
    const cases = await Cases.find();
    res.status(200).json(cases);
  } catch (error) {
    //console.log(error);
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
