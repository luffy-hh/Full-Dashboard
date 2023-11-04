const bankCategory = require("../models/bankCatModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
// Create Bank Type
exports.createBankCat = catchAsync(async (req, res) => {
  try {
    const newBankCategory = await bankCategory.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newBankCategory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

// Read All Bank Categories
exports.getBankCatAll = catchAsync(async (req, res) => {
  try {
    const query = bankCategory.find();
    const allBankCategories = await query;

    res.status(200).json({
      status: "Success",
      length: allBankCategories.length,
      data: {
        allBankCategories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Update Bank Category
exports.updateBankCategory = catchAsync(async (req, res) => {
  try {
    const bankCatId = req.body.id;
    const updateBankCat = await bankCategory.findByIdAndUpdate(
      bankCatId,
      { ...req.body },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "Success",
      data: {
        updateBankCat,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});
