const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Partnerperferred = require("../models/partnerperferred");
const User = require("../models/user");
const {checkToken} = require("../auth/token_validation");



router.post("/:email", (req, res, next) => {

  User.find({ email: req.params.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {

        const partnerperfered = new Partnerperferred({
           _id: new mongoose.Types.ObjectId(),
          agerange:req.body.agerange,
          heightrange: req.body.heightrange,
          countries: req.body.countries,
          occpations: req.body. occpations,
          education: req.body.education,
          
          
        })
        console.log(partnerperfered);
       

        partnerperfered
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "partnerdetails added"
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
        User.update({email: req.params.email},{$set: {partnerperferred: partnerperfered._id}}) 
         .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      }
      // else{


      // }

      });

    });




module.exports = router;
