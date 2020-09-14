const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Location = require("../models/location");


router.post("", (req, res, next) => {
    Location.find({"country.name":req.body.name})
    .exec()
    .then(contry=>{
        console.log(contry)
        if (contry<1) {

            const location = new Location ({
                country:req.body.country
                
        
               });
             
             location
             .save()
             .then(result => {
               console.log(result);
               res.status(201).json({
                 message: "contry added"
               });
             })
             .catch(err => {
               console.log(err);
               res.status(500).json({
                 nerror: err
               });
             });
            
        }else{
            res.status(500).json({
                error: "contry already exists"
              });

        }
    })
    
    
    

  


 });

 router.get("",(req,res,next)=>{
  Location.find()
  .exec( function(err,country){
    if (err) {
      console.log(err);
      res.status(500).json({
         err: err
       });
  } else {
  
      res.status(201).json({
         data:country
       });
  }
  })     

});


router.patch("",(req,res,next)=>{
    Location.update({ "country.name": req.body.name },
    { "$addToSet": { "country.$.district":req.body.district } })
    .exec( function(err,country){
      if (err) {
        console.log(err);
        res.status(500).json({
           err: err
         });
    } else {
    
        res.status(201).json({
           data:country
         });
    }
    })     
  
  });


 module.exports = router;