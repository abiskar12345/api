const mongoose = require('mongoose');
const User = require("../models/user");
const  partnerperferredSchema = mongoose.Schema({
   
    lowerage : {
        type:Number
    },
    higherage :{
        type:Number
    },
    lowerheight : {
        type:Number
    },
    higherheight :{
        type:Number
    },
    countries:{
        type:String
    },
    occpations:{
        type:String
    },
    education:{
        type:String
    }
   
});

const Partnerperferred = mongoose.model('Partnerperferred', partnerperferredSchema);
module.exports = Partnerperferred;