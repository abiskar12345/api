const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const User = require("../models/user");
const { checkToken } = require("../auth/token_validation");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Personaldetails = require("../models/personaldetails");

router.post("/:email", (req, res, next) => {

  User.find({ email: req.params.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {

          const personaldetails = new Personaldetails({
          _id: new mongoose.Types.ObjectId(),
          name:req.body.name,
          birthyear: req.body.birthyear,
          birthmonth: req.body.birthmonth,
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
          console.log(result);
          res.status(201).json({
            message: "Userdetails added"
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
      }

      });


    });




module.exports = router;
