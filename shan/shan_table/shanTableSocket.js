const socketIo = require("socket.io");
const http = require("http"); // Make sure http is imported

// Assuming you have an http server instance
const http_server = http.createServer(/* your server configuration */);
const io = socketIo(http_server);

let tableRooms = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle table joining
  socket.on("joinTable", (tableId) => {
    socket.join(tableId);
    console.log(`User joined table: ${tableId}`);

    // Initialize or update the table room data
    if (!tableRooms[tableId]) {
      tableRooms[tableId] = { players: [] };
    }

    // Add player to the room
    tableRooms[tableId].players.push(socket.id);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");

    // Remove the disconnected player from the table room
    for (const tableId in tableRooms) {
      tableRooms[tableId].players = tableRooms[tableId].players.filter(
        (playerId) => playerId !== socket.id
      );
    }
  });
});

module.exports = { io, tableRooms };
