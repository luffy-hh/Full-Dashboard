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

options = {
  key: fs.readFileSync("/etc/letsencrypt/live/gamevegas.online/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/gamevegas.online/fullchain.pem"),
};

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Success"));

const port = process.env.PORT || 3000;
const http_server = https.createServer(options, app);

// const io = new Server(http_server);

// let tableRooms = {}; // Object to store players in each table

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Handle table joining
//   socket.on("joinTable", (tableId) => {
//     socket.join(tableId);
//     console.log(`User joined table: ${tableId}`);

//     // Initialize or update the table room data
//     if (!tableRooms[tableId]) {
//       tableRooms[tableId] = { players: [] };
//     }

//     // Add player to the room
//     tableRooms[tableId].players.push(socket.id);
//   });

//   // Disconnect event
//   socket.on("disconnect", () => {
//     console.log("User disconnected");

//     // Remove the disconnected player from the table room
//     for (const tableId in tableRooms) {
//       tableRooms[tableId].players = tableRooms[tableId].players.filter(
//         (playerId) => playerId !== socket.id
//       );
//     }
//   });
// });

http_server.listen(port, () => console.log("Listen Now", port));
