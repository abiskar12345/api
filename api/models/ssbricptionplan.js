
const mongoose = require('mongoose');
const User = require("../models/user");
const payment = require("../models/payment");

let planSchema =mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User'

    },
    email: {
         type: String,
         require:true
        }, //The validate Email should be a function that get as value the email and return true or false if it is valid! (email format/not duplicated)
    subscriptionplan:
     {
          type: Number 
     },// 0-non. 1-basic, 2-standard, 3-premium (this will be set by the payment)

    subscriptionDate: 
    { 
        type: Date,
        default: Date.now()
    
    },
    card_id:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'Payment'
    },
    expiredAt:
     {
          type: Date,
          required: true,
          expires: 120
          

     }//This also will be set by the payment, and will be checked before any service giving. making sure the subscription is still valid.
});

// planSchema.createIndex({expiredAt: 1}, {expireAfterSeconds:2000});

module.exports = mongoose.model('Plan', planSchema);