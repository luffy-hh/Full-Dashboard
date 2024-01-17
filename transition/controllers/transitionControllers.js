const Transition = require("../models/transitionModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const {
  createTransactionRecord,
} = require("../../transaction-record/transactionRecordController");

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

// transfer unit with userId (not database id)
// access private
// Url api/v1/transferTo/:id
exports.transferUnitWithUserId = catchAsync(async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (user) {
      if (req.body.amount <= req.user.unit) {
        const sendUser = await User.findOne({ _id: req.user.id });

        const sentUser = await User.findByIdAndUpdate(
          req.user.id,
          { $inc: { unit: -req.body.amount } },
          { new: true }
        ).select(
          "-password -__v -sessionIdentifier -loginTime -passwordChangedAt"
        );
        const receiveUser = await User.findOne({ userId: req.params.id });

        const transactionSenderObj = {
          user_id: sentUser._id,
          action_id:receiveUser._id,
          before_amt: sendUser.unit,
          after_amt: sentUser.unit,
          action_amt: req.body.amount,
          type: "send to other",
          status: "Out",
        };
        const newSenderRecord = createTransactionRecord(transactionSenderObj);

        const receivedUser = await User.findByIdAndUpdate(
          receiveUser._id,
          { $inc: { unit: req.body.amount } },
          { new: true }
        ).select(
          "-password -__v -sessionIdentifier -loginTime -passwordChangedAt"
        );
        const transactionReceiverObj = {
          user_id: receiveUser._id,
          action_id: sendUser._id,
          before_amt: receiveUser.unit,
          action_amt: req.body.amount,
          after_amt: receivedUser.unit,
          type: "receive from other",
          status: "In",
        };
        const newReceiverRecord = createTransactionRecord(
          transactionReceiverObj
        );
        res.status(200).json({
          status: "succeed",
          sentUser,
          receivedUser,
        });
      } else {
        next(
          new AppError(
            "You balance is insufficient for this action.Please Top Up!",
            400
          )
        );
      }
    } else {
      res.status(400).json({
        status: "failed",
        message: "The userId you entered is not valid or not existed",
      });
    }
  } catch (e) {
    next(new AppError(e.message, 500));
  }
});
