const mongoose = require("mongoose");
  
const locationSchema = mongoose.Schema({
    
   
    country: [{
        name:{
            type:String
        },
        code:{
            type:String
        },
        district:[{
            districtname:{
                type:String
            },
            cities:[{
             type:String
            }]
            
    
        }]
       
      }]
      });
module.exports = mongoose.model("Location", locationSchema);

