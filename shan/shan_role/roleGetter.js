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
  const roles = await Role.find({});
  return roles;
};

exports.responseRoleById = async (roleId) => {
  const roles = await Role.findById(roleId);
  return roles;
};
