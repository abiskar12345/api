const mongoose = require("mongoose");
const User = require("../models/user");
const PersonaldetailsSchema = mongoose.Schema({
  name: {
    type: String,
  },
  birthyear: {
    type: Number,
    maxlength: 4,
  },
  birthmonth: {
    type: Number,
    maxlength: 2,
  },
  age: {
    type: Number,
    maxlength: 2,
  },
  birthday: {
    type: Number,
    maxlength: 2,
  },
  martialstatus: {
    type: String,
  },
  noofchild: {
    type: String,
  },

  height: {
    type: String,
  },
  weight: {
    type: String,
  },
  email: {
    type: String,
  },
  Aboutyourself: {
    type: String,
  },
});

const Personaldetails = mongoose.model(
  "Personaldetails",
  PersonaldetailsSchema
);
module.exports = Personaldetails;
