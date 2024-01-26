const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
require("./slots/grpc-services/grpc");
const setupSocketLogic = require("./shan/shan_table/shanSocket");
const tableGetter = require("./shan/shan_table/tableGetter");
const { setIOInstance } = require("./shan/shan_table/shanTableController");
const shanTableControllerSocket = require("./shan/shan_table/shanTableControllerSocket");

dotenv.config({ path: "./config.env" });
let options = {};

let tableRooms = [];

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Success");
  })
  .catch((error) => {
    console.error(error);
  });

(async () => {
  tableRooms = [];
  const tablesValue = await tableGetter.getTableAll();
  tableRooms = [...tableRooms, ...tablesValue];
  setupServer();
})();

function setupServer() {
    const port = process.env.PORT || 5000;
  const httpServer = http.createServer(app);

  // Socket.IO server

  const io = new Server();

  console.log("endpoint:" + tableRooms);

  // Default namespace connection event
  io.on("connection", (socket) => {
    console.log(`${socket.id} : user connected`);
    socket.emit("welcomeMessage", { message: "Welcome To Shan" });
    socket.on("updateRole", async () => {
      roleNamespace = [];
      const rolesValue = await roleGetter.getRoleAll();
      roleNamespace = [...roleNamespace, ...rolesValue];
      console.log("Change Role Value:", rolesValue);
    });
  });

  const allRoles = io.of("/allRoles");
  allRoles.on("connection", (socket) => {
    console.log("Connected For Roles Data All");

    socket.on("requestTableDataALl", async (data) => {
      await shanRoleControllerSocket.readRoleData(socket, data);
    });
  });

  const createRole = io.of("/createRole");
  createRole.on("connection", (socket) => {
    console.log("Role Create");
    socket.emit("StartRole", { message: "Create Start Role" });

    socket.on("newRoleData", async (data) => {
      await shanRoleControllerSocket.createRoleData(socket, data);
      roleNamespace = [];
      const rolesValue = await roleGetter.getTables();
      roleNamespace = [...roleNamespace, ...rolesValue];
      console.log("Create Role Value:", roleNamespace);
    });
  });

  const joinTable = io.of("/joinTable");
  joinTable.on("connection", (socket) => {
    console.log("Start Join Table Processing...");

    socket.on("joinTableData", async (data) => {
      const parsedData = JSON.parse(data);
      try {
        console.log("Table Id :" + parsedData.tableId);

        // Check existing players in the specified table
        const socketsInTable = await io
          .of(parsedData.endpoint)
          .in(parsedData.tableId)
          .fetchSockets();

        const socketsInTableCount = socketsInTable.length;

        console.log(`Sockets in Table Count ${socketsInTableCount}`);

        // Join the player to the table room
        socket.join(parsedData.tableId);

        // Notify other players in the table about the new player
        joinTable.to(parsedData.tableId).emit("playerJoined", {
          userId: socket.id,
          tableId: parsedData.tableId,
          message: `Player ${socket.id} joined the table!`,
        });

        console.log(`Player ${socket.id} joined table ${parsedData.tableId}`);
      } catch (error) {
        console.error("Error processing joinTableData:", error);
      }
    });
  });

  const adminNamespace = io.of("/dashboard");
  adminNamespace.on("connection", (socket) => {
    console.log(`Admin connected`);

    socket.on("changeTable", async () => {
      tableRooms = [];
      const tablesValue = await tableGetter.getTables();
      tableRooms = [...tableRooms, ...tablesValue];
      console.log("Change Table Value:", tablesValue);
    });

    // Handle "disconnect" event
    socket.on("disconnect", () => {
      console.log(`Admin ${socket.id} disconnected`);
    });
  });

  setupSocketLogic(io, roleNamespace);
  httpServer.listen(port, () => console.log("Listen Now", port));
  io.attach(httpServer, {
    cors: {
      "Access-Control-Allow-Origin": "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
}
