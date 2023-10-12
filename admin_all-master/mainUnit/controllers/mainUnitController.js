const MainUnit = require("../models/mainUnitModel");
const MainUnitHistory = require("../models/mainUnitHistoryModel");
const User = require("../../users/userModels");

// Create Main Unit
exports.createMainUnit = async (req, res) => {
  try {
    const newUnitValue = await MainUnit.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newUnitValue,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Read Main Unit
exports.getMainUnitValue = async (req, res) => {
  try {
    const unitId = "6527d1074eb2bfc53e025c9d";

    const query = MainUnit.findById(unitId);
    const mainUnitValue = await query;

    res.status(200).json({
      status: "Success",
      data: {
        mainUnitValue: mainUnitValue,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// Update or Increase / Decrease Main Unit
exports.updateMainUnit = async (req, res) => {
  try {
    const unitId = "6527d1074eb2bfc53e025c9d";
    const addUnitValue = req.body.mainUnit * 1;
    const mainUnitObj = await MainUnit.findById(unitId);
    const orgMainUnitValue = mainUnitObj.mainUnit * 1;
    const status = req.body.status;

    let newMainUnit;
    if (status === "in") {
      newMainUnit = orgMainUnitValue + addUnitValue;
    } else if (status === "out") {
      newMainUnit = orgMainUnitValue - addUnitValue;
    } else {
      return;
    }

    const currentDate = new Date();

    const mainUnitValue = await MainUnit.findByIdAndUpdate(
      unitId,
      {
        mainUnit: newMainUnit,
      },
      { new: true }
    );

    //User Id and User Name
    const userId = "6527cb9f8d49230db6027fbb";
    const curentUserObj = await User.findById(userId);
    const userName = curentUserObj.name;

    const mainUnitHistoryObj = {
      userId: userId,
      userName: userName,
      createDate: currentDate,
      actionAmount: addUnitValue,
      newAmount: newMainUnit,
      status: status,
    };

    const mainUnitHistory = await MainUnitHistory.create(mainUnitHistoryObj);
    res.status(200).json({
      status: "Success",
      data: {
        mainUnitValue,
        mainUnitHistory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
