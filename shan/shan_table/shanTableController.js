const ShanRole = require("../shan_role/shanRoleModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const {all} = require("express/lib/application");
const ShanTable = require("./shanTableModel");
const { io, tableRooms } = require('./shanTableSocket');

// Create Shan Table From Admin
exports.createShanTableFromAdmin = catchAsync(async (req, res) => {
  try {
    const { tableName, role, description } = {
      ...req.body,
    };

    // Find the player by userId
    // const playerObj = await User.findOne({ userId: userId });

    // Check if the player with the given userId exists
    // if (!playerObj) {
    //   return res.status(404).json({
    //     status: "fail",
    //     message: "User not found",
    //   });
    // }

    // Extract relevant player data
    // const playerGameUnit = playerObj.gameUnit;
    const shanRoleObj = await ShanRole.findById(role);

    if (!shanRoleObj) {
      return res.status(404).json({
        status: "fail",
        message: "ShanRole not found",
      });
    }

    // if (shanRoleObj.banker_amount > playerGameUnit) {
    //   return res.status(404).json({
    //     status: "fail",
    //     message: "Not Enough Game Unit For Banker Level",
    //   });
    // }
    // if (shanRoleObj.max_amount < playerGameUnit) {
    //   return res.status(404).json({
    //     status: "fail",
    //     message:
    //       "Your Game Unit Has exceed the Max Amount. Please Play in higher role! (OR) Reduce Your Game Unit and Try Again",
    //   });
    // }

    // const user_id = playerObj._id.toString();

    // Create a new ShanTable document
    const newTable = new ShanTable({
      tableName,
      banker_amount:shanRoleObj.banker_amount,
      role,
      description,
      // players: [{ userId: user_id, game_unit: playerGameUnit }],
    });

    // Save the new ShanTable document
    await newTable.save();

    // Fetch the complete ShanPlayRing document with populated players' and shan_roll data
    const initialTableObj = await ShanTable.findById(newTable._id);
    const endPoint = `/${initialTableObj._id}`;

    // Update the ShanTable document with the endPoint property
    const updateTable = await ShanTable.findByIdAndUpdate(
      initialTableObj._id,
      { endPoint: endPoint },
      { new: true } 
    );

    // Respond with the complete data, including ring details, player details, and shan_roll details
    res.status(201).json({
      status: "success",
      data: {
        newTable: updateTable,
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

    // Calculate player count for each table
    const tableData = allTables.map((table) => {
      const playersInRoom =
        tableRooms[table._id]?.players.length || 0; // Access player count for the table room

      return {
        table,
        playersCount: playersInRoom,
      };
    });

    res.status(200).json({
      status: 'succeed',
      tableCount:tableData.length,
      data: tableData,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({
      status: 'failed',
      message: 'Error while getting all tables',
    });
  }
});

exports.getTablesByRole = catchAsync(async (req, res, next) => {
  try {
    const roleId = req.params.id;
    console.log(roleId);
    const allTables = await ShanTable.find({role:roleId});
    console.log(allTables);

    // Calculate player count for each table
    const tableData = allTables.map((table) => {
      const playersInRoom =
        tableRooms[table._id]?.players.length || 0; // Access player count for the table room

      return {
        table,
        playersCount: playersInRoom,
      };
    });

    res.status(200).json({
      status: 'succeed',
      tableCount:tableData.length,
      data: tableData,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({
      status: 'failed',
      message: 'Error while getting all tables',
    });
  }
});

