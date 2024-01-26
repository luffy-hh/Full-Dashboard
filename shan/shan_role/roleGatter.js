const Role = require("./shanRoleModel");

exports.getRoleAll = async () => {
  let updateRoleArr = [];
  const shanRoles = await Role.find({});

  shanRoles.map((role) => {
    updateRoleArr.push(role.endPoint);
  });
  return updateRoleArr;
};

exports.responseRoleAll = async () => {
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
