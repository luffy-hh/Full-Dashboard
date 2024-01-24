const ShanRole = require("../shan_role/shanRoleModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const ShanTable = require("./shanTableModel");

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
    const allTables = await ShanTable.find({});

    res.status(200).json({
      status: "succeed",
      tableCount: allTables.length,
      data:  allTables,

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
    const allTables = await ShanTable.find({ role: roleId });

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
