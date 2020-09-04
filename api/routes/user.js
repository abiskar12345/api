const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { checkToken } = require("../auth/token_validation");
// const Personaldetails = require("../models/personaldetails");
// const Partnerperferred = require("../models/partnerperferred");

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name:req.body.name,
              email: req.body.email,
              password: hash
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
      }
    });
});

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


router.post("/login",(req,res , next)=>{
  User.find({ email: req.body.email })
 

  .exec()
  .then(user => {
    console.log(user)
   
    if (user.length < 1) {
      return res.status(401).json({
        message: "ser dosent exists"
      });
    }
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
      if (err){
        return res.status(401).json({
          message: "aexists"
        });
        
      }
      if(result) {
    
       const token = jwt.sign({
          email:user[0].email,
          password:user[0].password,
          partnerperferred:user[0].partnerperferred
        },'hahsh',{
          expiresIn:"1h" 
        });
        return res.status(200).json({
          message: "logged in", 
          token:user
        });
        
      }
      res.status(200).json({
        message: "log in failed"
      });
    })


  })


 .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        }) ;
      });
  

});


router.get("/:email", (req, res, next) => {
   User.find({ email: req.params.email } )
   .populate("personalDetail")
   .populate("partnerperferred")
   .exec(function(err, users) {
      if(err) {
          res.json(err);
      } else {
          res.json(users)
      }

    
    });
  });
  
  
router.post("/", upload.single('profileImage/:email'), (req, res, next) => {
  
  User.update({email: req.params.email},{$set: {image: req.path.image}}) 
  .catch(err => {
   console.log(err);
   res.status(500).json({
     error: err
   });
 }); 
  
  
});


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
       
      }
      // else{


      // }

      });

    });

module.exports = router;
