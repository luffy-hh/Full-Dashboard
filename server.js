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
const shanPlay = require("./shan/shan_play/shan_play");

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

      // shanPlay.shanPlay(socketIdArr, tableNs, socketId);
      // const socketArrLength = socketIdArr.length;
      // if (socketArrLength > 1) {
      // ထိုးသားတွေဆီက Play Bat တွေလက်ခံမယ်။
      // သက်ဆိုင်ရာ User အလိုက် Amount တွေကို နှုတ်မယ်။
      // Table မှာ User အလိုက် Bet Amount တွေကို Update လုပ်မယ်။
      // Data တွေ အကုန်လုံးကို UI ကို ပို့ပေးမယ်။
      // ဖဲချပ်နှစ်ချပ်ဝေမယ်။
      // ထပ်တောင်းရင် ထပ်တောင်းတဲ့ userId အလိုက် ဖဲချပ်တစ်ချပ်စီထပ်ပို့မယ်။
      // Player တစ်ယောက်ချင်းစီရဲ့ ဖဲချပ်တွေကို ပေါင်းမယ်။
      // Player တစ်ယောက်ချင်းစီရဲ့ ဖဲချပ်သည် Banker ထက်ကြီးရင် Player နိုင်တယ်။
      // Banker ထက် ငယ်ရင် Banker နိုင်တယ်။
      // Player တွေနိုင်ရင် နိုင်တာရဲ့ ၁၀% ဖြတ်မယ်။
      // အဲ့ဒါကို Admin ဆီကိုပို့ပြီး ကျန်တာကို Player ဆီမှာ Update လုပ်ပေးမယ်။
      // Banker နိုင်ရင် နိုင်တာရဲ့ ၁၀% ကို ဖြတ်ပြီး ကျန်တာကို Banker ဆီမှာ Update လုပ်မယ်။
      // အားလုံးပြီးရင် နောက်တစ်ပွဲထပ်စမယ်။
      // } else {
      //   io.of(tableNs).emit("tableStop", {
      //     message: "To Start Play more then 2 player",
      //   });
      // }

      socket.on("userData", async (data) => {
        socketIdArr.push({
          userId: data.userId,
          tableId: data.tableId,
          socketId,
          betAmt: 0,
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
          })
          .on("betAmt", (data) => {
            console.log(`${socketId} betting amount with ${data}`);
          });
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

      // Deliver Card
      io.of(tableNs)
        .to(socketId)
        .emit("cardDeliver", {
          firstCard: {
            cardName: "Hello",
          },
          secondCard: {
            cardName: "World",
          },
          thirdCard: {
            cardName: "Hello World",
          },
        });
    });
  });

  // Player's Show Data
  const playerData = io.of("/playerData");
  // Table Id , User Id
  playerData.on("connection", async (socket) => {
    socket.on("connectUser", (data) => {
      const tableId = data.tableId;
      const userId = data.UserId;
    });
    const allRoleData = await Role.find({});
    socket.emit("responseRoleAllData", {
      length: allRoleData.length,
      allRoleData,
    });
    console.log("Join Player");
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
