const axios = require("axios");
const crypto = require("crypto");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

function generateMD5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

// Get Balance
exports.getBalance = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;
    const userObj = await User.findById(currentUserId);

    const playerId = userObj.userId;
    const methodName = "getbalance";

    const apiUrl = "https://swmd.6633663.com/";
    const operatorCode = "E616";
    const secretKey = "P8uzXq";
    const date = new Date();
    const requestTime =
      date.getFullYear().toString() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);
    const timeStamp = new Date().getTime();
    const messageId = currentUserId.toString() + "_" + timeStamp.toString();
    const stringToHash = operatorCode + requestTime + methodName + secretKey;
    const signature = generateMD5Hash(stringToHash);
    console.log(messageId, requestTime);
    const requestData = {
      OperatorCode: operatorCode,
      RequestTime: requestTime,
      Sign: signature,
      MemberName: playerId,
      MessageID: messageId,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    // const response = await axios.post(apiUrl, requestData, { headers });
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    const data = await response.json();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.stack });
  }
};
