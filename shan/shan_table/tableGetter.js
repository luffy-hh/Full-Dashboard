const ShanTable = require("./shanTableModel");
exports.getTableAll = async () => {
  let updateTablesArr = [];
  const shanTables = await ShanTable.find({})
    .populate({
      path: "role",
      model: "ShanRole",
    })
    .exec();

  shanTables.map((table) => {
    updateTablesArr.push(table.endPoint);
  });
  return updateTablesArr;
};

exports.responseTableAll = async () => {
  const shanTables = await ShanTable.find({})
    .populate({
      path: "role",
      model: "ShanRole",
    })
    .exec();
  return shanTables;
};

exports.getTableByRole = async (roleId) => {
  const shanTables = await ShanTable.find({ role: roleId })
    .populate({
      path: "role",
      model: "ShanRole",
    })
    .exec();
  return shanTables;
};
