const ShanRole = require("../shan_role/shanRoleModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const ShanTable = require("./shanTableModel");
const { io, tableRooms } = require("./shanTableSocket");

exports.createShanTableFromAdmin = catchAsync(async (req, res) => {
  try {
    const { tableName, role, description } = req.body;

    const shanRoleObj = await ShanRole.findById(role);

    if (!shanRoleObj) {
      return res.status(404).json({
        status: "fail",
        message: "ShanRole not found",
      });
    }

    const newTable = new ShanTable({
      tableName,
      banker_amount: shanRoleObj.banker_amount,
      role,
      description,
    });

    await newTable.save();

    const tableNamespace = io.of(`/${newTable._id}`);
    console.log(tableNamespace);

    newTable.tableNamespaceId = tableNamespace._name;
    await newTable.save();

    tableNamespace.emit("testEvent", { message: "Hello from the namespace" });

    res.status(201).json({
      status: "success",
      data: {
        newTable,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
});

// get all Tables
exports.getAllTables = catchAsync(async (req, res, next) => {
  try {
    const allTables = await ShanTable.find({});

    // Fetch the socket namespace IDs for all tables
    const tableNamespaceIds = allTables.map((table) => table.tableNamespaceId);

    // Calculate player count for each table
    const tableData = allTables.map((table) => {
      const playersInRoom = tableRooms[table._id]?.players.length || 0; // Access player count for the table room

      return {
        table,
        playersCount: playersInRoom,
      };
    });

    res.status(200).json({
      status: "succeed",
      tableCount: tableData.length,
      data: {
        tables: tableData,
        tableNamespaceIds: tableNamespaceIds,
      },
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({
      status: "failed",
      message: "Error while getting all tables",
    });
  }
});

exports.getTablesByRole = catchAsync(async (req, res, next) => {
  try {
    const roleId = req.params.id;
    console.log(roleId);
    const allTables = await ShanTable.find({ role: roleId });
    console.log(allTables);

    // Calculate player count for each table
    const tableData = allTables.map((table) => {
      const playersInRoom = tableRooms[table._id]?.players.length || 0; // Access player count for the table room

      return {
        table,
        playersCount: playersInRoom,
      };
    });

    res.status(200).json({
      status: "succeed",
      tableCount: tableData.length,
      data: tableData,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({
      status: "failed",
      message: "Error while getting all tables",
    });
  }
});
