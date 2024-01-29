const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
require("./slots/grpc-services/grpc");
const setupSocketLogic = require("./shan/shan_table/shanSocket");
const roleGetter = require("./shan/shan_role/roleGatter");
const shanTableControllerSocket = require("./shan/shan_table/shanTableControllerSocket");

dotenv.config({ path: "./config.env" });
let options = {};

let roleNamespace = []; //tableRooms;

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
  const RoleValue = await roleGetter.getRoleAll();
  roleNamespace = [...roleNamespace, ...RoleValue];
  setupServer();
})();

function setupServer() {
    const port = process.env.PORT || 5000;
  const httpServer = http.createServer(app);

  // Socket.IO server

  const io = new Server();
  console.log("All Role Name Space:" + roleNamespace);

  // Default namespace connection event
  io.on("connection", (socket) => {
    console.log(`${socket.id} : user connected`);
    socket.emit("welcomeMessage", { message: "Welcome To Shan" });

    socket.on("updateRole", async () => {
      roleNamespace = [];
      const rolesValue = await roleGetter.getRoleAll();
      roleNamespace = [...roleNamespace, ...rolesValue];
      console.log("All Role Name Space:" + roleNamespace);
    });
  });
  roleNamespace.forEach((ns) => {
    const userSocketMap = {};
    io.of(ns).on("connection", (socket) => {
      console.log(`Join Now Role Id ${ns}`);
      socket.emit("welcome", { message: "welcome To Table" });
      socket.on("playerData", async (data) => {
        try {
          const token = data.token;
          const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
          );
          const currentUser = await User.findById(decoded.id);
          const currentRoleId = ns.startsWith("/") ? ns.substring(1) : ns;
          const roleObj = await Role.findById(currentRoleId);
          console.log(roleObj);

          const tableObj = await Table.findById(data.tableId);
          // Table is Existing Or Not Codition
          if (!tableObj) {
            socket.emit("rejectJoinTable", {
              message: "404 Error , Table was deleted.",
              status: false,
            });
            return;
          }
          // Players Is full or not Condition
          if (
            tableObj.players.length >= 6 ||
            Object.keys(userSocketMap).length >= 6
          ) {
            socket.emit("rejectJoinTable", {
              message: "This Table can't join because of full of players.",
              status: false,
            });
            return;
          }
          // Player is Stay Current table or not Condition
          if (
            tableObj.players.some(
              (player) =>
                player.userId.toString() === currentUser._id.toString()
            )
          ) {
            socket.emit("rejectJoinTable", {
              message: "Your Already Joined This Table.Why Joking?",
              status: false,
            });
            return;
          }

          // Player is Stay Other table or not Condition
          const otherTable = await Table.findOne({
            "players.userId": currentUser._id.toString(),
          });

          if (otherTable) {
            const filterUser = otherTable.players.find((player) => {
              return player.userId.toString() === currentUser._id.toString();
            });
            if (filterUser.player_role === "banker") {
              return;
            }
            otherTable.players = otherTable.players.filter(
              (player) => String(player.userId) !== String(currentUser._id)
            );

            await otherTable.save();
          }

          // Check Table Object Array is First Element Or Not
          console.log(tableObj.players.length);
          if (tableObj.players.length === 0) {
            tableObj.players.push({
              userId: currentUser._id,
              player_role: "banker",
              // bank_amt: ,
            });
          } else {
            tableObj.players.push({
              userId: currentUser._id,
            });
          }

          await tableObj.save();
          socket.join(data.tableId);
          userSocketMap[currentUser.userId] = socket.id;
        } catch (error) {
          console.error("Error processing joinTableData:", error);
        }
      });
    });
  });

  // Get All Role
  const allRoles = io.of("/allRoles");
  allRoles.on("connection", async (socket) => {
    const allRoleData = await Role.find({});
    socket.emit("responseRoleAllData", {
      length: allRoleData.length,
      allRoleData,
    });
    console.log("Connected For Roles Data All");
  });

  // Create New Table
  const createTable = io.of("/createTable");
  createTable.on("connection", (socket) => {
    console.log("Table Create");
    socket.emit("StartTable", { message: "Create Start Table Processing" });

    socket.on("newTableData", async (data) => {
      await shanTableControllerSocket.createTableData(socket, data);
    });
  });

  // Get All Tables
  const allTables = io.of("/allTables");
  allTables.on("connection", (socket) => {
    console.log("Connected For Tables Data All");

    socket.on("requestTableDataAll", async (data) => {
      await shanTableControllerSocket.readTableData(socket, data);
    });
  });
  
  httpServer.listen(port, () => console.log("Listen Now", port));
  io.attach(httpServer, {
    cors: {
      "Access-Control-Allow-Origin": "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
}
