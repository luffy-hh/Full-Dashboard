const Transition = require("../models/transitionModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

// Transfer Unit
exports.transferUnit = catchAsync(async (req, res) => {
  try {
    const reqBody = req.body;
    const options = {
      timeZone: "Asia/Yangon",
      timeZoneName: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const currentTime = new Date().toLocaleString("en-US", options);

    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const fromId = decoded.id;
    const currentUserObj = await User.findById(fromId);

    const toId = reqBody.toId;
    const toUserObj = await User.findById(toId);
    const amount = reqBody.amount;

    if (amount > currentUserObj.unit) {
      res.status(404).json({
        status: "fail",
        message: "Not Enough Amount",
      });
    }
    if (currentUserObj.unit > amount) {
      const lastUnit = currentUserObj.unit - amount;
      const addUnit = toUserObj + amount;

      const fromUserUpdateObj = await User.findByIdAndUpdate(fromId, {
        $inc: { unit: -amount },
      });

      const toUserUpdateObj = await User.findByIdAndUpdate(toId, {
        $inc: { unit: amount },
      });

      const transitionHistoryObj = {
        fromId: fromId,
        toId: toId,
        amount: amount,
        action_time: currentTime,
        desc: reqBody.desc,
      };

      const insertTransitionHistory = await Transition.create({
        ...transitionHistoryObj,
      });

      const returnTransitionHistory = await Transition.findById(
        insertTransitionHistory._id
      )
        .populate("fromId")
        .populate("toId");

      res.status(201).json({
        status: "success",
        data: {
          fromUserUpdateObj,
          toUserUpdateObj,
          returnTransitionHistory,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

// Transfer History
exports.transferHistory = catchAsync(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const transitionHistoryObj = await Transition.find({
      $or: [{ fromId: userId }, { toId: userId }],
    })
      .populate("fromId")
      .populate("toId");

    res.status(201).json({
      status: "success",
      length: transitionHistoryObj.length,
      data: {
        transitionHistoryObj,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});
