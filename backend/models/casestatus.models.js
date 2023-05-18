const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const caseStatusSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    caseid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6,
    },
    statuscode: {
      type: Number,
      required: true,
      minlength: 1,
    },
  },
  {
    timestamps: true,
  }
);

const CaseStatus = mongoose.model("CaseStatus", caseStatusSchema);

module.exports = CaseStatus;
