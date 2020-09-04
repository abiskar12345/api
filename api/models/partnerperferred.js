const mongoose = require('mongoose');
const User = require("../models/user");
const  partnerperferredSchema = mongoose.Schema({
    // pid: mongoose.Schema.Types.ObjectId,
    // product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    // quantity: { type: Number, default: 1 }

   
    agerange : {
        type:String
    },
    heightrange :{
        type:String
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