const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Likedprofile = require("../models/likedprofile");
const User = require("../models/user");

router.post("", (req, res, next) => {

     Likedprofile.findOne(
        {  profileiD:req.body.likedprofile },{
         
            match: { likedusers : req.body.profileid} }
         
         )
         .exec()
         .then( profile =>{
            console.log('11');
            
             console.log(profile)
             if(profile !=null){
                console.log('hi111');
                 
        Likedprofile.findOneAndUpdate(
            { profileiD:  req.body.likedprofile}, 
            { $push: { matcheduser:req.body.profileid

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
             Likedprofile.findOneAndUpdate(
                {  profileiD:req.body.profileid }, 
                { $addToSet: {likedusers: req.body.likedprofile,
                     matcheduser: req.body.likedprofile
                    
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
                     res.end();
                 });
             }
             else{
                console.log('h2222');

                Likedprofile.findOneAndUpdate(
                    {  profileiD: req.body.profileid }, 
                    { $addToSet: { likedusers:req.body.likedprofile
                    } },
                   function (error, success) {
                    if (error) {
                        console.log(error);
                        res.status(500).json({
                           error: "error"
                         });
                    } else {
                        console.log(success);
                        res.status(201).json({
                           data:success
                         });
                    }
                     });
             }
         });
 });

 router.get("/:id",(req,res,next)=>{
  Likedprofile.find({profileiD:req.params.id})
  .populate('likedusers')
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


 module.exports = router;