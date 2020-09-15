const http = require('http');
const dotenv = require('dotenv');
const socketio = require("socket.io");
const socket = require('./api/socket/socket');

dotenv.config({path:'./config.env'});
const app = require('./app');

const port =process.env.PORT|3000;

const server = http.createServer(app);
const io =socketio(server);

io.on('connection',()=>{
    console.log("conncected new user")
})

// const socket =io('localhost:3000');

server.listen(port) ;

// app.listen(port,()=>console.log("Server connected successfully...."));


