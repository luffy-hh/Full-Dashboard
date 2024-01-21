const ShanTable = require("./shanTableModel");
const getTables = async () => {
  let updateTablesArr = [];
  const shanTables = await ShanTable.find({});

  shanTables.map((table) => {
    updateTablesArr.push(table.endPoint);
  });
  return updateTablesArr;
};

module.exports = { getTables };
