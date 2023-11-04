const bankType = require("../models/bankTypeModles");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
// Create Bank Type
exports.createBankType = catchAsync(async (req, res) => {
  try {
    const newBankType = await bankType.create(req.body);
    const resBankType = await bankType
      .findById(newBankType._id)
      .populate("bankCatData");
    res.status(201).json({
      status: "success",
      data: {
        resBankType,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

// Read All Bank Type
exports.getBankTypeAll = catchAsync(async (req, res) => {
  try {
    const allBankTypes = await bankType.find().populate("bankCatData");

    res.status(200).json({
      status: "Success",
      length: allBankTypes.length,
      data: {
        allBankTypes,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Update Bank Type name
exports.updateBankType = catchAsync(async (req, res) => {
  try {
    const bankTypeId = req.body.id;
    const updateBankType = await bankType
      .findByIdAndUpdate(
        bankTypeId,
        { ...req.body },
        {
          new: true,
        }
      )
      .populate("bankCatData");

    res.status(200).json({
      status: "Success",
      data: {
        updateBankType,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});
