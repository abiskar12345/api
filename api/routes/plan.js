const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Plan = require("../models/ssbricptionplan");
const User = require("../models/user");

router.post("", (req, res, next) => {
    Plan.find({ email: req.body.email })
      .exec()
      .then(plan => {
        if (plan.length >= 1) {
          return res.status(409).json({
            message: "plan already exists"
          });
        } else {

            Date.prototype.addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            }
            var date = new Date();
            console.log(date.addDays(5))
            

        
              const user = new Plan({
                _id: new mongoose.Types.ObjectId(),
               
                email: req.body.email,
                subscriptionplan:req.body.plan,
                user_id:req.body.userid,
                card_id:req.body.card_id,
                expiredAt:Date.now()//according to plan
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
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


 module.exports = router;