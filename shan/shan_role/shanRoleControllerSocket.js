const roleGetter = require("./roleGatter");
const ShanRole = require("./shanRoleModel");

exports.createRoleData = async (socket, data) => {
  try {
    const parsedData = JSON.parse(data);
    const newTable = new ShanTable({
      tableName: parsedData.tableName,
      role: parsedData.role,
      description: parsedData.description,
    });
    await newTable.save();
    const endpoint = `/${newTable._id.toString()}`;
    newTable.endPoint = endpoint;
    await newTable.save();

    socket.emit("createTable", { newTable });
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
};

exports.readRoleData = async (socket, data) => {
  try {
    const parsedData = JSON.parse(data);

    if (parsedData.idValue === "all") {
      const rolesValue = await roleGetter.responseRoleAll();
      socket.emit("responseRoleDataAll", { roleDataAll: rolesValue });
      console.log("getRoleDatasAll Value:", rolesValue);
    } else if (parsedData.idValue !== "all" && data) {
      const rolesValue = await roleGetter.getRoleById(parsedData.idValue);
      socket.emit("responseRoleDataAll", { roleDataAll: rolesValue });
    }
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
};
