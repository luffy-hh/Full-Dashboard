const axios = require("axios");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const generateMD5HashFun = require("../../utils/generateMD5Hash");
const crypto = require("crypto");
const User = require("../../users/userModels");
const Provider = require("../providers/providersModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const timeStamp = require("../../utils/timestamp");

exports.placeBet = async (req, res) => {
  try {
    const data = req.body;
    const providerObj = await Provider.findOne({
      providerCode: data.Transactions[0].ProductID,
    });
    const conversionRate = providerObj.conversionRate;
    const betAmt = data.Transactions[0].BetAmount;
    const realBetAmt = betAmt * conversionRate;
    const currentUserObj = await User.findOne({ userId: data.MemberName });
    let resData = {
      ErrorCode: 0,
      ErrorMessage: "Success",
      Balance: 86.95,
      BeforeBalance: 96.95,
    };
    if (realBetAmt > currentUserObj.unit) {
      resData.ErrorCode = 1001;
      resData.ErrorMessage = "API Member Insufficient Balance";
      resData.Balance = currentUserObj.unit / conversionRate;
      resData.BeforeBalance = currentUserObj.unit / conversionRate;
    } else {
      resData.Balance = currentUserObj.unit / conversionRate - betAmt;
      resData.BeforeBalance = currentUserObj.unit / conversionRate;
      await User.findByIdAndUpdate(currentUserObj._id, {
        unit: resData.Balance * conversionRate,
      });
    }
    res.json(resData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
