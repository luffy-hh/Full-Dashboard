const dotenv = require("dotenv");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
require("./slots/grpc-services/grpc");
const roleGetter = require("./shan/shan_role/roleGetter");
const shanTableControllerSocket = require("./shan/shan_table/shanTableControllerSocket");
const User = require("./users/userModels");
const Table = require("./shan/shan_table/shanTableModel");
const tableGetter = require("./shan/shan_table/tableGetter");
const Role = require("./shan/shan_role/shanRoleModel");
const shanCard = require("./shan/shanCard");
dotenv.config({ path: "./config.env" });

let tables = [];

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
  const tableValue = await tableGetter.getTableAll();
  tables = [...tableValue];
  setupServer();
})();

function setupServer() {
  const port = process.env.PORT || 5000;
  const httpServer = http.createServer(app);

  // Socket.IO server

  const io = new Server();
  console.log("All Tables Name Space:", tables);

  // Default namespace connection event
  io.on("connection", (socket) => {
    console.log(`${socket.id} : user connected`);
    socket.emit("welcomeMessage", { message: "Welcome To Shan" });

    socket.on("updateTable", async (data) => {
      tables = [];
      const tableValue = await tableGetter.getTableAll();
      const updateTableObj = await tableGetter.responseTableByRole(data.roleId);
      console.log("Role Id", updateTableObj);
      tables = [...tableValue];
      io.emit("updateTableFinish", {
        roleId: data.roleId,
        updateTableObj,
      });
    });
  });

  tables.forEach((tableNs) => {
    io.of(tableNs).on("connection", (socket) => {
      const socketIdArr = [];
      const socketId = socket.id;

      // const shanArray = [];
      // // Shan Array ထဲကို 0 - 51 ကြား random number 18 လုံးထည့်မယ်..
      // // ရလာတဲ့ Random Number တွေကို ထပ်/မထပ် စစ်ထုတ်ရမယ် တစ်ကယ်လို့ array ထဲမှာ ရှိပြီးသား value ဖြစ်နေတယ်ဆိုရင် Random Number ကို နောက်တစ်ကြိမ် ပြန် run ခိုင်းပြီး ထပ်တိုက်စစ်မယ် နောက်ဆုံး မတူညီတဲ့ Random Number 18 လုံးဖြစ်တော့မှ array ကို အမှန်ယူမယ်...
      // const shanArrayValue = () => {
      //   let shanVal = Math.round(Math.random() * 51);
      //   if (shanArray.includes(shanVal)) {
      //     shanVal = Math.round(Math.random() * 51);
      //   } else {
      //     shanArray.push(shanVal);
      //   }
      // };

      // let i = 0;
      // while (i < 1) {
      //   shanArrayValue();
      //   if (shanArray.length === 18) {
      //     i++;
      //   }
      // }
      // //ရလာတဲ့ shanArray ထဲက Random Number 18 လုံးကို user တစ်ယောက်လျင် ၁ ကြိမ် နှစ်ခါ ပေးမယ်... Data တွေကို Socket နဲ့ပို့မှာဖြစ်တဲ့အတွက် socketIdArr ကို loop ပတ်ပြီး ပို့ပါ့မယ်။

      // shanArray.forEach((arr) => {
      //   io.of(tableNs).to(arr.socketId).emit("initialCard", {
      //     firstCard: shanArray[0],
      //     secondCard: shanArray[1],
      //   });
      //   shanArray.splice(0, 2);
      //   console.log(shanArray[0], shanArray[1]);
      // });

      // Deliver Cards To Client

      socket.on("userData", async (data) => {
        socketIdArr.push({
          userId: data.userId,
          tableId: data.tableId,
          socketId,
        });
        console.log(socketIdArr);
        const tableObj = await Table.findById(data.tableId);
        const currentUserObj = await User.findOne({ userId: data.userId });
        const roleObj = await Role.findById(tableObj.role);
        const currentUserRole = tableObj.players.find(
          (player) => player.userId === currentUserObj.userId
        );

        // Table ရဲ့ min and max amout, user name,  user amount, user role, shan process (win or lose) current user ID
        io.of(tableNs)
          .to(socketId)
          .emit("dataFromServer", {
            message: {
              min_amt: roleObj.min_amount,
              max_amt: roleObj.max_amount,
              banker_amt: roleObj.banker_amount,
              currentUserName: currentUserObj.name,
              currentUserAmt: currentUserObj.unit,
              currentUserRole: currentUserRole.player_role,
              tableArr: tableObj.players,
            },
          });
        socket.on("betAmt", async ({ betAmt }) => {
          console.log(`${socketId} betting amount with ${betAmt}`);
          console.log("Current User Object :", currentUserObj);
          if (currentUserObj.gameUnit > betAmt) {
            socket.emit("rejectBetAmt", {
              message: "Your Bet Amount Not Enough",
            });
          }

          const updateUser = await User.findOneAndUpdate(
            {
              userId: currentUserObj.userId,
            },
            { gameUnit: currentUserObj.gameUnit - betAmt },
            { new: true }
          );
          const updateTable = await Table.findOneAndUpdate(
            {
              "players.userId": currentUserObj.userId,
            },
            {
              $set: {
                "players.$.play_amt": betAmt,
                "players.$.gameUnit": currentUserObj.gameUnit - betAmt,
              },
            },
            { new: true }
          );
          socket.emit("currentUserBetAmt", {
            betAmt: betAmt,
            updateUser,
          });
          io.of(tableNs).emit("tableData", {
            updateTableArr: updateTable.players,
          });
        });

        // Deliver To Initial Card
      });

      // Client Request From Table Id and User Token
      socket.on("playerData", async (data) => {
        try {
          const token = data.token;
          const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET
          );
          const currentUser = await User.findById(decoded.id);
          const tableObj = await Table.findById(data.tableId);
          const roleObj = await Role.findById(tableObj.role);
          // Table is Existing Or Not Codition
          if (!tableObj) {
            socket.emit("rejectJoinTable", {
              message: "404 Error , Table was deleted.",
              status: false,
            });
            return;
          }
          // Players Is full In array or not Condition
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
              io.of(`${otherTable.endPoint}`).emit("updateTables", {
                message: "Update Table",
                tableObj,
              });
            }
          }
          // Save Table Object In MongoDB Database Palyer Data
          if (tableObj.players.length === 0) {
            tableObj.players.push({
              userObjId: currentUser._id,
              userId: currentUser.userId,
              userName: currentUser.name,
              player_role: "banker",
              bank_amt: roleObj.banker_amount,
              gameUnit: currentUser.gameUnit - roleObj.banker_amount,
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
              gameUnit: currentUser.gameUnit,
              userName: currentUser.name,
            });
          }
          await tableObj.save();

          const updatTableWithAllRole = await Table.find({
            role: tableObj.role,
          });

          io.of(tableNs).emit("updateTables", {
            message: "Update Table",
            updatTableWithAllRole,
            roleId: tableObj.role,
            currentUserId: currentUser.userId,
          });

          // Table ရဲ့ min and max amout, user name,  user amount, user role, shan process (win or lose) current user ID

          const currentUserData = {
            objId: currentUser._id.toString(),
            name: currentUser.name,
            userId: currentUser.userId,
            gameUnit: currentUser.gameUnit,
          };

          io.of(tableNs).emit("joinUserSuccess", {
            tableObj,
            currentUserData,
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
      // Remove From Table
      socket.on("leaveTable", async (data) => {
        console.log("Leave Table Data", data);

        try {
          const tableObj = await Table.findOneAndUpdate(
            { "players.userId": data.userId },
            {
              $pull: {
                players: { userId: data.userId },
              },
            },
            { new: true }
          );

          const indexToRemove = socketIdArr.findIndex(
            (item) => item.userId === data.userId
          );
          if (indexToRemove !== -1) {
            socketIdArr.splice(indexToRemove, 1);
          }
          io.of(tableNs).emit("leavePlayer", {
            message: "Successfully Leave Player From Table",
            status: true,
          });
        } catch (error) {
          console.error("Error leaving table:", error);
        }
      });
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
