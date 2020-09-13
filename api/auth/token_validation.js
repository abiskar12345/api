const jwt = require("jsonwebtoken");
const express = require("express");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();
const mongoose = require("mongoose");
const Token = require("../models/verificationtoken");
const User = require("../models/user"); 

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            success: 0,
            message: "Invalid Token..."
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
  }



  

  
};


/**
* POST /confirmation

*/

router.post("/confirmation",(req,res,next)=>{

  // Find a matching token
  Token.findOne({ token: req.body.token }, function (err, token) {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

      // If we found a token, find a matching user
      User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {
          if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
          if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send("The account has been verified. Please log in.");
          });
      });
  })

});


router.post('/resendtoken',(req,res,next)=>{

   User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.'});
      if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

      // Create a verification token, save it, and send email
      var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

      // Save the token
      token.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
          console.log("heyy");
          //  let testAccount = nodemailer.createTestAccount();

          // Send the email
          var transporter = nodemailer.createTransport({ 
            host: 'smtp.gmail.com',
           port: 587,
             secure: false,
           requireTLS: true,
            // service: "Gmail",
            // port: 465,
          
            auth: {
              user: "amazingstudiosab@gmail.com", // generated ethereal user
              pass: "youtube@pass1", // generated ethereal password
            } });
          var mailOptions = { from: 'amazingstudios@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
          transporter.sendMail(mailOptions, function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send('A verification email has been sent to ' + user.email + '.');
          });
      });

  });
});

module.exports = router;