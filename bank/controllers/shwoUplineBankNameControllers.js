const BankAcc = require("../models/bankAccModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const BankName = require("../models/bankNameModels");

const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// Read Bank Name From Upline
exports.getUplineBankName = catchAsync(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;
    const currentUserObj = await User.findById(currentUserId);
    const currentUplineId = currentUserObj.uplineId;
    const uplineObj = await User.findOne({ userId: currentUplineId });
    const uplineUserId = uplineObj._id.toString();

    const uplineBankNameIds = await BankAcc.distinct("bankNameId", {
      ownerId: uplineUserId,
    });

    const allUplineBankNames = await BankName.find({
      _id: { $in: uplineBankNameIds },
    });

    res.status(200).json({
      status: "Success",
      length: allUplineBankNames.length,
      data: {
        uplineBankNames: allUplineBankNames,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});
