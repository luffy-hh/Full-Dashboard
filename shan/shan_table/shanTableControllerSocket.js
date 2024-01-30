const tableGetter = require("./tableGetter");
const ShanTable = require("./shanTableModel");

exports.createTableData = async (socket, data) => {
  try {
    const newTable = new ShanTable({
      tableName: data.tableName,
      role: data.role,
      description: data.description,
    });
    await newTable.save();

    return newTable;
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
};

exports.readTableData = async (socket, data) => {
  try {
    if (data.idValue === "all") {
      const tablesValue = await tableGetter.responseTableAll();
      socket.emit("responseTableDataAll", { tableDataAll: tablesValue });
      console.log("getTableDatasAll Value:", tablesValue);
    } else if (data.idValue !== "all" && data.idValue) {
      const tablesValue = await tableGetter.getTableByRole(data.idValue);
      socket.emit("responseTableDataAll", { tableDataAll: tablesValue });
    }
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
};
