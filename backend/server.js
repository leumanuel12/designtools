const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const usersRouter = require("./routes/users");
const caseStatusRouter = require("./routes/casestatus");

app.use("/users", usersRouter);
app.use("/casestatus", caseStatusRouter);

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri); //I removed useNewUrlParser and useCreateIndex

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connection has been established successfully.");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
