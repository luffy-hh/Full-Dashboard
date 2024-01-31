const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");
const User = require("../../users/userModels");
const ShanTable = require("./shanTableModel");
// const ShanPlay = require("../shan_play/shanPlay.js-bkp");
const ShanRole = require("../shan_role/shanRoleModel");

function setupSocketLogic(io, tableRooms) {
  // const shanPlay = new ShanPlay(io, tableRooms);

  tableRooms.forEach((endpoint) => {
    io.of(endpoint).on("connection", async (tableSocket) => {
      const token = tableSocket.handshake.query.token;

      try {
        const decoded = await promisify(jwt.verify)(
          token,
          process.env.JWT_SECRET
        );

        const currentUser = await User.findById(decoded.id);

        const currentPlayersCount = tableSocket.server.engine.clientsCount;

        if (currentPlayersCount >= 6) {
          console.log(`Table full. Cannot join.`);
          tableSocket.emit("tableFull", {
            message: "This table is full. Cannot join.",
          });
          tableSocket.disconnect();
          return;
        }

        console.log(`User connected: ${currentUser.name}`);

        await removeUserFromPreviousTable(currentUser.userId, io);

        const shanTable = await ShanTable.findOne({ endPoint: endpoint });
        const shanRoleObj = await ShanRole.findById(shanTable.role);
        const bankerAmt = shanRoleObj.banker_amount;

        if (!shanTable) {
          console.error("Table not found");
          tableSocket.disconnect();
          return;
        }

        const isUserAlreadyJoined = shanTable.players.some(
          (player) => String(player.userId) === String(currentUser.userId)
        );

        if (isUserAlreadyJoined) {
          console.log(`User already joined the table`);
          tableSocket.disconnect();
          return;
        }

        const player_role =
          shanTable.players.length === 0 ? "banker" : "player";

        shanTable.players.push({
          userId: currentUser.userId,
          player_role,
          game_unit: currentUser.gameUnit,
          game_unit:
            player_role === "banker"
              ? currentUser.gameUnit - bankerAmt
              : currentUser.gameUnit,
          banker_amt:
            player_role === "banker" ? currentUser.gameUnit - bankerAmt : 0,
        });

        await shanTable.save();

        tableSocket.emit("joinTable", {
          tableId: endpoint,
          userName: currentUser.name,
          userId: currentUser.userId,
          gameunit: currentUser.gameUnit,
          message: `Welcome, ${currentUser.name}!`,
        });

        // Call the play function when needed
        // shanPlay.play(shanTable);
      } catch (error) {
        console.error(`Error decoding token:`, error);
        tableSocket.disconnect();
      }
    });
  });
}

async function removeUserFromPreviousTable(userId, io) {
  const previousTable = await ShanTable.findOne({
    "players.userId": userId,
  });

  if (previousTable) {
    previousTable.players = previousTable.players.filter(
      (player) => String(player.userId) !== String(userId)
    );

    await previousTable.save();

    const previousNamespace = io.of(previousTable.endPoint);

    if (previousNamespace) {
      const previousSocket = Object.values(previousNamespace.sockets).find(
        (socket) => String(socket.decoded.id) === String(userId)
      );

      if (previousSocket) {
        previousSocket.disconnect();
      }
    }
  }
}

module.exports = setupSocketLogic;
