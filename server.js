const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("./slots/grpc-services/grpc");
const roleGetter = require("./shan/shan_role/roleGetter");
const shanTableControllerSocket = require("./shan/shan_table/shanTableControllerSocket");
const User = require("./users/userModels");
const Table = require("./shan/shan_table/shanTableModel");
const Role = require("./shan/shan_role/shanRoleModel");
const shanCard = require("./shan/shanCard");
dotenv.config({ path: "./config.env" });

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
          const tableObj = await Table.findById(data.tableId);

          if (!currentUser) {
            socket.emit("rejectJoinTable", {
              message: "User not found.",
              status: false,
            });
            return;
          }

          // Table is Existing Or Not Codition
          if (!tableObj) {
            socket.emit("rejectJoinTable", {
              message: "404 Error , Table was deleted.",
              status: false,
            });
            return;
          }
          // Players Is full or not Condition
          if (tableObj.players.length >= 6) {
            socket.emit("rejectJoinTable", {
              message: "This Table can't join because of full of players.",
              status: false,
            });
            return;
          }
          // Player is Stay Current table or not In Database Condition
          if (
            tableObj.players.some(
              (player) =>
                player.userObjId.toString() === currentUser._id.toString()
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
            "players.userId": currentUser.userId,
          });
          let joinedPalyerObjAtOtherTable;
          if (otherTable) {
            joinedPalyerObjAtOtherTable = otherTable.players.find((player) => {
              return player.userId === currentUser.userId;
            });
          }

          if (joinedPalyerObjAtOtherTable) {
            if (joinedPalyerObjAtOtherTable.player_role === "banker") {
              socket.emit("rejectJoinTable", {
                message:
                  "You are Banker In Other Table So not join other table.",
                status: false,
              });
              return;
            } else {
              otherTable.players = otherTable.players.filter(
                (player) => player.userId !== currentUser.userId
              );
              await otherTable.save();
            }
          }
          // Check Table Object Array is First Element Or Not
          if (tableObj.players.length === 0) {
            tableObj.players.push({
              userObjId: currentUser._id,
              userId: currentUser.userId,
              userName: currentUser.name,
              player_role: "banker",
              bank_amt: roleObj.banker_amount,
            });
            await User.updateOne(
              { userId: currentUser.userId },
              {
                $set: {
                  gameUnit: currentUser.gameUnit - roleObj.banker_amount,
                },
              }
            );
          } else {
            tableObj.players.push({
              userObjId: currentUser._id,
              userId: currentUser.userId,
              userName: currentUser.name,
            });
          }

          await tableObj.save();
          socket.emit("joinSuccess", {
            tableId: data.tableId,
            // user: currentUser,
            // status: true,
            // tableData: tableObj,
            // roleData: roleObj,
          });
        } catch (error) {
          console.error("Error processing joinTableData:", error);
          if (error.code === 11000) {
            socket.emit("rejectJoinTable", {
              message: "Duplicate key error. User with this ID already exists.",
              status: false,
            });
          }
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
  const createTableIo = io.of("/createTable");
  createTableIo.on("connection", (socket) => {
    console.log("Table Create");
    socket.emit("StartTable", { message: "Create Start Table Processing" });

    // Table Data in Database
    socket.on("newTableData", async (data) => {
      const newTable = await shanTableControllerSocket.createTableData(
        socket,
        data,
        createTableIo
      );
      socket.emit("createTable", { status: true, newTable });
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

  // Playing Game
  const playGame = io.of("/playGame");
  playGame.on("connection", (socket) => {
    try {
      console.log("Game Start Playing");
      socket.emit("welcome", { status: true, message: "Shan Game Start Play" });
      socket.on("tableId", async (data) => {
        const tableId = data.tableId;
        const tableObj = await Table.findById(tableId);
        const roleObj = await Role.findById(tableObj.role);
        // Table ရဲ့ min and max amount player ရဲ့ name နှင့် amout, current player ရဲ့ id or name
        const currentPlayerArr = [];
        const currentPalyerDataArr = await Promise.all(
          tableObj.players.map(async (player) => {
            const userObj = await User.findById(player.userObjId.toString());
            return {
              playerId: player.userId,
              playerName: userObj.name,
              playerRole: player.player_role,
              playerAmount: userObj.gameUnit,
              bankAmount: player.bank_amt,
            };
          })
        );
        currentPlayerArr.push(...currentPalyerDataArr);
        const initTableData = {
          tableId: tableId,
          tableMinAmt: roleObj.min_amount,
          tableMaxAmt: roleObj.max_amount,
          currentPlayerArr: currentPlayerArr,
        };

        socket.emit("initTableData", {
          initTableData,
        });
        socket.on("betArr", (data) => {
          console.log(data);
        });

        console.log(
          `Table Id : ${tableId} and Table Object : ${tableObj} and Role Object : ${roleObj}`
        );
        console.log("User Array:", currentPalyerDataArr);
      });
    } catch (error) {
      console.error("Error processing joinTableData:", error);
      socket.emit("palyingError", {
        message: "Palying Function Error",
        status: false,
      });
    }

    // const tableId = data.tableId;
    // const tableObj = await Table.findById(tableId);
    // socket.emit("startPlay", {
    //   tableId: tableId,
    //   tableObj,
    // });
    // console.log(tableObj);
    // Creade Card For Six Player
    // const cardArray = [];
    // const shanArrayValue = () => {
    //   let cardVal = Math.round(Math.random() * 51);
    //   if (cardArray.includes(cardVal)) {
    //     cardVal = Math.round(Math.random() * 51);
    //   } else {
    //     cardArray.push(cardVal);
    //   }
    // };
    // let i = 0;
    // while (i < 1) {
    //   shanArrayValue();
    //   if (cardArray.length === 18) {
    //     i++;
    //   }
    // }
    // const playCard = [];
    // for (let i = 0; i < tableObj.players.length; i++) {
    //   playCard.push({
    //     userId: tableObj.players[i].userId,
    //     cardId: [
    //       shanCard.shan[cardArray[0]],
    //       shanCard.shan[cardArray[1]],
    //       shanCard.shan[cardArray[2]],
    //     ],
    //   });
    //   cardArray.splice(0, 3);
    // }
    // console.log(shanCard);
    // console.log(cardArray);
    // console.log(playCard);
    // const userArr = [];
    // playCard.forEach(user => {
    //   // userArr.push()
    //   user.
    // })
    // socket.emit("playData", {
    //   tableId: data.tableId,
    //   playCard: playCard,
    // });
    // });
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
