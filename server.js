const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const https = require("https");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const fs = require("fs");
require("./slots/grpc-services/grpc");
dotenv.config({ path: "./config.env" });
let options = {};
const shanSocket = require("./shan/shan_table/shanTableSocket");

// options = {
//   key: fs.readFileSync("/etc/letsencrypt/live/gamevegas.online/privkey.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/gamevegas.online/fullchain.pem"),
// };

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Success"));

const port = process.env.PORT || 5000;
const http_server = http.createServer(app);

const io = new Server(http_server);

let tableRooms = {}; // Object to store players in each table

io.on("connection", (socket) => {
  shanSocket.init(socket, io);
});

http_server.listen(port, () => console.log("Listen Now", port));
