const Deposit = require("../modals/depositModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const MainUnit = require("../../mainUnit/models/mainUnitModel");
const {
  createTransactionRecord,
} = require("../../transaction-record/transactionRecordController");
const {populate} = require("dotenv");
// Create Bank Type
exports.createDeposit = catchAsync(async (req, res) => {
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
    const uplieId = currentUserObj.uplineId;
    const uplieObj = await User.findOne({ userId: uplieId });
    const toId = uplieObj._id.toString();

    const insertObj = {
      fromId,
      toId,
      action_time: currentTime,
      bankName_id: reqBody.bankName_id,
      fromAcc: reqBody.fromAcc,
      transferCode: reqBody.transferCode,
      toAcc: reqBody.toAcc,
      amount: reqBody.amount,
      status: "Panding",
      description: "deposit",
    };

    const newDeposit = await Deposit.create({ ...insertObj });
    // const resObj = newDeposit
    //   .populate("fromId")
    //   .populate("toId")
    //   .populate("bankName_id");
    res.status(201).json({
      status: "success",
      data: {
        newDeposit,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Read All Deposit
exports.getDeposit = catchAsync(async (req, res) => {
  try {
    const query = Deposit.find();
    const allDeposit = await query;

    res.status(200).json({
      status: "Success",
      data: {
        allDeposit: allDeposit,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

exports.getDepositUpline = catchAsync(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const toId = decoded.id;

    const allDepositUpline = await Deposit.find({ toId: toId })
      .populate("fromId")
      .populate("toId")
      .populate("bankName_id");

    res.status(200).json({
      status: "Success",
      length: allDepositUpline.length,
      data: { allDepositUpline: allDepositUpline },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

exports.getDepositDownline = catchAsync(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const fromId = decoded.id;

    const allDepositDownline = await Deposit.find({ fromId: fromId })
      .populate("fromId")
      .populate("toId")
      .populate("bankName_id");

    res.status(200).json({
      status: "Success",
      length: allDepositDownline.length,
      data: { allDepositDownline: allDepositDownline },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

exports.updateDeposit = catchAsync(async (req, res) => {
  try {
    const reqBody = req.body;
    const currentTime = new Date();
    const depositId = req.params.id;
    const depositObj = await Deposit.findById(depositId);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const userObj = await User.findById(userId);

    const downlineUserObj = await User.findById(depositObj.fromId);

    if (reqBody.status === "Confirm") {
      const depositObj = await Deposit.findByIdAndUpdate(
        depositId,
        {
          action_time: currentTime,
          status: "Confirm",
        },
        {
          new: true,
        }
      ).populate("fromId toId");
      console.log(depositObj.toId.unit, "deposit 158");

      const updateUnit = userObj.unit - reqBody.unit;
      const updateUser = await User.findByIdAndUpdate(
        userId,
        {
          unit: updateUnit,
        },
        { new: true }
      );

      const depositUnit = depositObj.fromId.unit + reqBody.unit;
      const downlineUserDepositUpdate = await User.findByIdAndUpdate(
        depositObj.fromId,
        { unit: depositUnit },
        { new: true }
      );
      const transactionObj = {
        user_id: depositObj.toId,
        action_id: depositObj.fromId,
        before_amt: depositObj.toId.unit,
        action_amt: reqBody.unit,
        after_amt: updateUser.unit,
        type: "deposit-confirmed",
        status: "Out",
      };
      const newTransactionRecord = createTransactionRecord(transactionObj);
      const newReceiverTransaction = {
        user_id: depositObj.fromId,
        action_id: depositObj.toId,
        before_amt: depositObj.fromId.unit,
        action_amt: reqBody.unit,
        after_amt: downlineUserDepositUpdate.unit,
        type: "deposit-received",
        status:'In'
      }
      res.status(200).json({
        status: "Success",
        data: {
          depositObj,
          updateUser,
          downlineUserDepositUpdate,
        },
      });
    }
    if (reqBody.status === "Cancle") {
      const depositObj = await Deposit.findByIdAndUpdate(
        depositId,
        {
          action_time: currentTime,
          status: "Cancle",
        },
        {
          new: true,
        }
      ).populate("fromId toId");
      console.log(depositObj, "line 207");

      const transactionObj = {
        user_id: depositObj.toId,
        action_id: depositObj.fromId,
        before_amt: depositObj.toId.unit,
        action_amt: reqBody.unit,
        after_amt: depositObj.toId.unit,
        type: "deposit-canceled",
        status: "Still",
      };
      res.status(200).json({
        status: "Success",
        data: {
          depositObj,
        },
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

exports.updateDepositMasterToAdmin = catchAsync(async (req, res) => {
  try {
    const reqBody = req.body;
    const currentTime = new Date();
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const userObj = await User.findById(userId);
    const depositId = req.params.id;
    const mainUnit = await MainUnit.find();
    const depositOrgObj = await Deposit.findById(depositId);

    if (reqBody.status === "Confirm") {
      const depositObj = await Deposit.findByIdAndUpdate(
        depositId,
        {
          action_time: currentTime,
          status: "Confirm",
        },
        {
          new: true,
        }
      ).populate("fromId toId");

      const mainUnitId = mainUnit[0]._id;
      const mainUnitDocument = mainUnit[0]; // Assuming it's an array with one document

      // Check if mainUnitDocument is valid and has a numeric mainUnit
      if (
        mainUnitDocument &&
        !isNaN(mainUnitDocument.mainUnit) &&
        !isNaN(reqBody.unit)
      ) {
        const updateUnit = mainUnitDocument.mainUnit - reqBody.unit;
        const updateMainUnit = await MainUnit.findByIdAndUpdate(
          mainUnitId,
          {
            mainUnit: updateUnit,
          },
          { new: true }
        );
        const updatedUser = await User.findByIdAndUpdate(
          depositOrgObj.fromId,
          {
            $inc: { unit: reqBody.unit },
          },
          { new: true }
        );
        const newSenderTransactionObj = createTransactionRecord({
          user_id: depositObj.toId,
          action_id: depositObj.fromId,
          before_amt:mainUnit[0].mainUnit,
          action_amt: reqBody.unit,
          after_amt: updateMainUnit.mainUnit,
          type:"deposit-confirmed",
          status:'Out'
        })
        const newReceiverTransactionObj = createTransactionRecord({
          user_id: depositObj.fromId,
          action_id: depositObj.toId,
          before_amt:depositObj.fromId.unit,
          action_amt: reqBody.unit,
          after_amt: updatedUser.unit,
          type:"deposit-received",
          status:'In'
        })


        res.status(200).json({
          status: "Success",
          data: {
            depositObj,
            updateMainUnit,
            updatedUser,
          },
        });
      } else {
        throw new Error("Invalid mainUnit or reqBody.unit value");
      }
    }

    if (reqBody.status === "Cancle") {
      const depositObj = await Deposit.findByIdAndUpdate(
        depositId,
        {
          action_time: currentTime,
          status: "Cancle",
        },
        {
          new: true,
        }
      ).populate("fromId toId");

      res.status(200).json({
        status: "Success",
        data: {
          depositObj,
        },
      });
    } else {
      throw new Error("Invalid userObj.unit or reqBody.unit value");
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
});
