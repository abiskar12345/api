const mongoose = require("mongoose");
const User =require("./user");
  
const blockedprofileschema = mongoose.Schema({
  profileiD: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  blockedusers:[{
    type:  mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }]
});

const Blockedprofile  = mongoose.model("Blockedprofile", blockedprofileschema);
module.exports = Blockedprofile;


