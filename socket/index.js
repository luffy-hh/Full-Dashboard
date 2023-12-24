const ShanPlayRing = require("../shan/shan_ring/models");
const ShanRoll = require("../shan/shan_role/models");
const { FETCH_ALL_ROWS, ROW_ID, ALL_TABLES } = require("../shanGame/actions");

exports.init = async (socket, io) => {
  console.log("socket user Id : " + socket.id);
  socket.emit(FETCH_ALL_ROWS, await ShanRoll.find());
  socket.on(ROW_ID, async (data) => {
    console.log(data);
    const allTable = await ShanPlayRing.find({ shan_roll: data.rowId });
    socket.emit(ALL_TABLES, allTable);
  });
};
