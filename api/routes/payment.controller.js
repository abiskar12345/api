const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const payment = require("../models/payment");



router.post("/:id", (req, res, next) => {
   
          bcrypt.hash(req.body.card_nmber, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const paymentdetails = new payment({
                _id: new mongoose.Types.ObjectId(),
                card_name:req.body.card_name,
                card_nmber: hash,
                user_card: req.body.user_card
              });
              paymentdetails
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User payment created"
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
 