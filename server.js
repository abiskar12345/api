const http = require('http');
const app = require('./app');
const socketio = require("socket.io");

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const socket =socketio(server);
socket.listen(port) ;


