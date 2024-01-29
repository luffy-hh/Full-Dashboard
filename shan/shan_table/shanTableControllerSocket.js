const tableGetter = require("./tableGetter");
const ShanTable = require("./shanTableModel");

exports.createTableData = async (socket, data) => {
  try {
    const parsedData = JSON.parse(data);
    const newTable = new ShanTable({
      tableName: parsedData.tableName,
      role: parsedData.role,
      description: parsedData.description,
    });
    await newTable.save();

    socket.emit("createTable", { newTable });
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
};

exports.readTableData = async (socket, data) => {
  try {
    const parsedData = JSON.parse(data);

    if (parsedData.idValue === "all") {
      const tablesValue = await tableGetter.responseTableAll();
      socket.emit("responseTableDataAll", { tableDataAll: tablesValue });
      console.log("getTableDatasAll Value:", tablesValue);
    } else if (parsedData.idValue !== "all" && parsedData.idValue) {
      const tablesValue = await tableGetter.getTableByRole(parsedData.idValue);
      socket.emit("responseTableDataAll", { tableDataByRole: tablesValue });
    }
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
};
