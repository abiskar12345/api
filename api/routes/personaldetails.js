const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const { checkToken } = require("../auth/token_validation");

const Personaldetails = require("../models/personaldetails");

router.post("/:email", (req, res, next) => {

Personaldetails.find({ email: req.params.email })
    .exec()
    .then(user => {
      // console.log(user);
      if (user.length < 1) {
        console.log("hii");
          const personaldetails = new Personaldetails({
          _id: new mongoose.Types.ObjectId(),
          email:req.params.email,
          name:req.body.name,
          birthyear: req.body.birthyear,
          birthmonth: req.body.birthmonth,
          age:req.body.age,
          birthday: req.body.birthday,
          martialstatus: req.body.martialstatus,
          noofchild: req.body.noofchild,
          height: req.body.height,
          weight: req.body.weight,
          aboutyourself: req.body.aboutyourself
           })
        personaldetails
        .save()
        .then(result => {
          // console.log(result);
          res.status(201).json({
            message: "Userdetails added",
            personaldetails
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
        User.update({email: req.params.email},{$set: {personalDetail: personaldetails._id}}) 
        .catch(err => {
         console.log(err);
         res.status(500).json({
           error: err
         });
       });

       
      }else
      {
      Personaldetails.updateOne({email:req.params.email},{$set:
         { 
          // name:req.body.name,
          birthyear: req.body.birthyear,
          birthmonth: req.body.birthmonth,
          birthday: req.body.birthday,
          age:req.body.age,
          martialstatus: req.body.martialstatus,
          noofchild: req.body.noofchild,
          height: req.body.height,
          weight: req.body.weight,
          // aboutyourself: req.body.aboutyourself
        }

      })
    
      
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: result
         
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    }
    // res.status(409).json({
    //   status:"failed",
    //   message:"User already added details"
    // });
   });
    });

    router.put("/:email", (req, res, next) => {
      
    })





module.exports = router;
