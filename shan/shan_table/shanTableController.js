const ShanRole = require("../shan_role/shanRoleModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const ShanTable = require("./shanTableModel");

let ioInstance;
const setIOInstance = (io) => {
  ioInstance = io;
};

exports.setIOInstance = setIOInstance;

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
      role,
      description,
    });

    await newTable.save();

    // Use the endPoint value directly in the route
    const endpoint = `/${newTable._id.toString()}`;
    newTable.endPoint = endpoint;
    await newTable.save();

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
    const allTables = await ShanTable.find({})
      .populate({
        path: "role",
        model: "ShanRoll",
      })
      .exec();

    res.status(200).json({
      status: "succeed",
      tableCount: allTables.length,
      data: {
        tables: allTables,
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
    const allTables = await ShanTable.find({ role: roleId })
      .populate({
        path: "role",
        model: "ShanRoll",
      })
      .exec();

    res.status(200).json({
      status: "succeed",
      tableCount: allTables.length,
      data: allTables,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({
      status: "failed",
      message: "Error while getting all tables",
    });
  }
});

exports.tableOut = async (req, res) => {
  try {
    const { tableId } = req.body;

    const shanTable = await ShanTable.findOne({ endPoint: `/${tableId}` });

    if (!shanTable) {
      return res.status(404).json({
        status: "fail",
        message: "Table not found",
      });
    }

    // Remove the user from the table players array
    const foundPlayer = shanTable.players.find(
      (player) => String(player.userId) === String(req.user.userId) // Use user.userId
    );

    // Update the user's game unit value
    if (foundPlayer) {
      req.user.gameUnit = foundPlayer.game_unit;
    } else {
      // Handle the case when the player is not found (e.g., log a message)
      console.error(
        `Player with userId ${req.user.userId} not found in table ${tableId}`
      );
    }

    await Promise.all([shanTable.save()]);

    // Emit an event to notify other clients about the player leaving
    ioInstance.of(shanTable.endPoint).emit("playerLeft", {
      userId: req.user.userId,
      tableId,
    });

    res.status(200).json({
      status: "success",
      message: "Player removed from table and game unit updated",
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.stack,
    });
  }
};
