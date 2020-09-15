const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blockedprofile = require("../models/blockedprofile");
const User = require("../models/user");

router.post("", (req, res, next) => {
  Blockedprofile.find({ profileiD :req.body.profileid})
  .exec()
  .then(user => {
    console.log(user);
    if (user.length >= 1) {
    

      Blockedprofile.findOneAndUpdate(
        { profileiD: req.body.profileid }, 
        { $push: { blockedusers:req.body.blockedprofile
        } },
       function (error, success) {
        if (error) {
          console.log(error);
          res.status(500).json({
             error: error
           });
      } else {
          console.log(success);
          res.status(201).json({
             data:success
           });
      }
         });

      
        } else{
      
           const blockprofile = new Blockedprofile({
            profileiD: req.body.profileid,
            blockedusers:req.body.blockedprofile
                
             })
         
         blockprofile
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              data:result
      
              
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
        
    
          }
    });

  });


    router.get("/:id",(req,res,next)=>{
      Blockedprofile.find({profileiD:req.params.id})
      .populate('blockedusers')
      .exec( function(err,profiles){
        if (err) {
          console.log(err);
          res.status(500).json({
             err: err
           });
      } else {
      
          res.status(201).json({
             data:profiles
           });
      }
      })     
    });



    router.put("/:id",(req,res,next)=>{
      Blockedprofile.update({ profileiD: req.params.id },
         { $pull: { blockedusers:{$in:[ req.body.blockedprofile]}}},
          function(err, obj) {
            if(err){
              res.status(500).json({
                err: err
              });
            }
            else {
      
              res.status(201).json({
                 obj
               });
          }  
    });
    });


 

 module.exports = router;