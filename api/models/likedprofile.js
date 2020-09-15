const mongoose = require("mongoose");
const User =require("./user");
  
const likedprofileschema = mongoose.Schema({
  profileiD: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likedusers: [{
    type:  mongoose.Schema.Types.ObjectId,
    ref: "User"
    
  }],
  matcheduser:[{
    type:  mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

const Likedprofile  = mongoose.model("Likedprofile", likedprofileschema);
module.exports = Likedprofile;


