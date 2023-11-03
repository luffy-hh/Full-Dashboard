const BankAcc = require("../models/bankAccModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");

const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// Read All Bank Account
exports.getBankAccDeposit = catchAsync(async (req, res) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];
    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // const currentUserId = decoded.id;
    const currentUserObj = await User.findById(req.user.id);
    const currentUplineId = currentUserObj.uplineId;
    const uplineObj = await User.findOne({ userId: currentUplineId });
    const uplineUserId = uplineObj._id.toString();

    const uplineBankAcc = await BankAcc.find({
      ownerId: uplineUserId,
    })
      .populate("bankNameId")
      .populate("ownerId");
    res.status(200).json({
      status: "Success",
      length: uplineBankAcc.length,
      data: {
        uplineBankAcc: uplineBankAcc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});
