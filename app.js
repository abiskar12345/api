const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const socketEvents = require('./api/socket/socket'); 
const partnerperferredRoutes = require("./api/routes/partnerperferred");
const personaldetailsRoutes = require("./api/routes/personaldetails");
const userRoutes = require('./api/routes/user');

mongoose.connect(
  // "mongodb://mahajodiser:mahajodiser1@cluster0-shard-00-00.0n0bn.mongodb.net:27017,cluster0-shard-00-01.0n0bn.mongodb.net:27017,cluster0-shard-00-02.0n0bn.mongodb.net:27017/mahajodi?ssl=true&replicaSet=atlas-9pxmwp-shard-0&authSource=admin&retryWrites=true&w=majority" ,

  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
  {
    useMongoClient: true
  },()=> console.log('connected to db')
  
);
 mongoose.Promise = global.Promise;



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mahajodiser:mahajodiser@cluster0.0n0bn.mongodb.net/mahajodi?retryWrites=true&w=majority";
// const client = new MongoClient( uri, { useNewUrlParser: true });
// client.connect(err => {
//   // const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   // client.close();
// });


app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routes which should handle requests
app.use("/user/partnerperferred", partnerperferredRoutes);
app.use("/user/personaldetails", personaldetailsRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
