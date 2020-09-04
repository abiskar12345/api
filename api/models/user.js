const mongoose = require('mongoose');
const Personaldetails = require('./personaldetails');
const perferredpartner= require('./partnerperferred');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },

    personalDetail : {
        type: mongoose.Schema.Types.ObjectId,
         ref:'Personaldetails'
    },
    
    careerDetails :[
        { 
            profession:{
                type: String
            },
            residence:{
                type:String,
                maxlength:4
            }

        }
    ],
    partnerperferred :{
        type: mongoose.Schema.Types.ObjectId,
         ref:'Partnerperferred'

    },
Aboutyourself:{
    type:String  
},
online:{
type:String 
},
image:{
   data:Buffer,
   type:string
}

});



module.exports = mongoose.model('User', userSchema);