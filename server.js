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
const shanCard = require("./shan/shan_card/shanCardModel");
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

  tables.forEach(async (tableNs) => {
    const socketIdArr = [];
    let sendFinalResultBoolean = false;
    //Shan Object ကို Array တစခုအနေနဲ့ ဆွဲထုတ်မယ်
    const shanCardArr = await shanCard.find();
    //Shan Object ကို Random Array အနေနဲ့ ပြန်ရေးထား
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    let randomShanArr = [];

    io.of(tableNs).on("connection", (socket) => {
      const socketId = socket.id;

      // Win / Loose Result
      socket.on("winlose", async ({ tableId }) => {
        const tableObj = await Table.findById(tableId);
        const players = tableObj.players;
        const banker = players.find(
          (player) => player.player_role === "banker"
        );

        for (const player of players) {
          if (player.player_role === "banker") {
            continue;
          }

          const result = banker.result < player.result ? true : false;

          // Push winlose:result into socketIdArr
          const userIndex = socketIdArr.findIndex(
            (item) => item.userId === player.userId
          );
          if (userIndex !== -1) {
            socketIdArr[userIndex].winlose = result;
          }

          console.log("Win Lose Result :", socketIdArr);
        }
        sendFinalResultBoolean = true;

        if (sendFinalResultBoolean) {
          for (const userArr of socketIdArr) {
            // Emit winlose event to each user
            io.of(tableNs)
              .to(userArr.socketId)
              .emit("winloseResult", { winlose: userArr.winlose });
          }
        }
        // အလျော် / အစား

        //Value From Socket Array
        const [bankerObjSocket] = socketIdArr.filter(
          (user) => user.winlose === undefined
        );
        const winPlayerArrSocket = socketIdArr.filter(
          (user) => user.winlose === true
        );
        const losePlayerArrSocket = socketIdArr.filter(
          (user) => user.winlose === false
        );

        //Value From Database
        const bankerObjMongo = tableObj?.players.find(
          (player) => player.userId === bankerObjSocket.userId
        );

        // အစား
        if (losePlayerArrSocket.length > 0) {
          for (const loser of losePlayerArrSocket) {
            const currentPlayer = tableObj?.players.find(
              (player) => player.userId === loser.userId
            );
            const currentUserObj = await User.findOne({
              userId: currentPlayer.userId,
            });

            const updateBankerAmt =
              bankerObjMongo.bank_amt + currentPlayer.play_amt;
            const updatePlayerAmt =
              currentUserObj.gameUnit - currentPlayer.play_amt;

            const userUpdate = await User.findOneAndUpdate(
              { userId: currentPlayer.userId },
              { $set: { gameUnit: updatePlayerAmt } },
              { new: true }
            );

            const tableUpdate = await Table.findOneAndUpdate(
              {
                "players.userId": bankerObjSocket.userId,
              },
              {
                $set: {
                  "players.$.bank_amt": updateBankerAmt,
                },
              },
              { new: true }
            );

            io.of(tableNs)
              .to(loser.socketId)
              .emit("winloseAmt", { amt: userUpdate.gameUnit });
          }
        }

        // အလျော်
        if (winPlayerArrSocket.length > 0) {
          //tableObj ထဲက banker_amt သည် 0 ဟုတ်/မဟုတ် စစ်မယ်။
          if (bankerObjMongo.bank_amt > 0) {
          } else {
            // 0 ဆိုရင် Client ကို ဒီအတိုင်းပြန်မယ် မလျော်ဘူး။
          }
          //Current Player ရဲ့ TableObj ထဲက play_amt ကိုယူမယ်။
          //TableObj ထဲက bank_amt ထဲကနေ play_amt ကို နှုတ်မယ်။ ပြီးရင် TableObj bank_amt မှာ ကျန်တာကို Update လုပ်မယ်။
          for (const winner of winPlayerArrSocket) {
            const currentPlayer = tableObj?.players.find(
              (player) => player.userId === winner.userId
            );
            const currentUserObj = await User.findOne({
              userId: currentPlayer.userId,
            });
            if (bankerObjMongo.bank_amt > 0) {
              const updateBankAmt = Math.max(
                0,
                bankerObjMongo.bank_amt - currentPlayer.play_amt
              );
              const updateUserAmt = bankerObjMongo.bank_amt - updateBankAmt;
              const userUpdate = await User.findOneAndUpdate(
                { userId: currentPlayer.userId },
                { $set: { gameUnit: updateUserAmt } },
                { new: true }
              );

              const tableUpdate = await Table.findOneAndUpdate(
                {
                  "players.userId": bankerObjSocket.userId,
                },
                {
                  $set: {
                    "players.$.bank_amt": updateBankAmt,
                  },
                },
                { new: true }
              );
              io.of(tableNs)
                .to(winner.socketId)
                .emit("winloseAmt", { amt: userUpdate.gameUnit });
            } else {
              const updateUserAmt = 0;
              const userUpdate = await User.findOneAndUpdate(
                { userId: currentPlayer.userId },
                { $set: { gameUnit: updateUserAmt } },
                { new: true }
              );
              io.of(tableNs)
                .to(winner.socketId)
                .emit("winloseAmt", { amt: userUpdate.gameUnit });
            }
          }
        }
      });

      // Deliver Shan Card
      //ရလာတဲ့ shanArray ထဲက Random Number 18 လုံးကို user တစ်ယောက်လျင် ၁ ကြိမ် နှစ်ခါ ပေးမယ်... Data တွေကို Socket နဲ့ပို့မှာဖြစ်တဲ့အတွက် socketIdArr ကို loop ပတ်ပြီး ပို့ပါ့မယ်။
      socket.on("startPlay", async () => {
        randomShanArr = shuffleArray(shanCardArr);

        for (const userArr of socketIdArr) {
          // Emit initialCard event to each user
          let firstCard = randomShanArr[0];
          let secondCard = randomShanArr[1];
          let result = firstCard.cardValue + secondCard.cardValue;
          if (result.toString().length > 1) {
            let modifiedResult = result.toString().slice(1);
            result = Number(modifiedResult);
          }
          // Update player_card in the database
          await Table.findOneAndUpdate(
            {
              "players.userId": userArr.userId,
            },
            {
              $push: {
                "players.$.player_card": {
                  firstCard: randomShanArr[0],
                  secondCard: randomShanArr[1],
                },
              },
              $set: {
                "players.$.result": result,
              },
            },
            { new: true }
          );

          io.of(tableNs).to(userArr.socketId).emit("initialCard", {
            firstCard,
            secondCard,
            result,
          });

          // Remove the first two elements from randomShanArr
          console.log("First Card Before", firstCard);
          console.log("Second Card Before", secondCard);
          randomShanArr.splice(0, 2);
        }
      });

      // Deliver Third Card
      socket.on("nextCard", async ({ userId }) => {
        console.log("nextCard");
        const thirdCard = randomShanArr[0];
        const tableObj = await Table.findOne({
          "players.userId": userId,
        });

        const playerIndex = tableObj?.players.findIndex(
          (player) => player.userId === userId
        );
        let result =
          playerIndex !== -1
            ? tableObj?.players[playerIndex]?.result
            : "Player not found or result not available";

        result += thirdCard.cardValue;
        if (result.toString().length > 1) {
          let modifiedResult = result.toString().slice(1);
          result = Number(modifiedResult);
        }

        await Table.findOneAndUpdate(
          {
            "players.userId": userId,
          },

          {
            $set: {
              "players.$.result": result,
            },
            $push: {
              "players.$.player_card": { thirdCard },
            },
          },
          { new: true }
        );

        socket.emit("nextCard", {
          thirdCard,
          result,
        });

        randomShanArr.splice(0, 1);
      });

      // Client Web Connect With Server
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
      });
      // Client Bet Amount
      socket.on("betAmt", async ({ betAmt, userId }) => {
        console.log(`${socketId} betting amount with ${betAmt}`);
        const currentUserObj = await User.findOne({ userId: userId });
        console.log("Current User Object", currentUserObj);
        if (betAmt > currentUserObj.gameUnit) {
          socket.emit("rejectBetAmt", {
            message: "Your Bet Amount Not Enough",
          });
        } else {
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
            updateUserId: updateUser.userId,
            updateUserName: updateUser.name,
            updateGameUnit: updateUser.gameUnit,
          });
          io.of(tableNs).emit("tableData", {
            updateTableArr: updateTable.players,
          });
        }
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
