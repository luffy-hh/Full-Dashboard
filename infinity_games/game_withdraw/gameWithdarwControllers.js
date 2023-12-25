const axios = require("axios");
const crypto = require("crypto");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

function generateMD5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

// Game Deposit
exports.gameDeposit = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUserId = decoded.id;
  const userObj = await User.findById(currentUserId);
  const amount = userObj.unit;
  console.log(amount);

  const playerId = userObj.userId;
  const functionName = "Deposit";

  const apiUrl = "https://smakermicsvc.back138.com/api/opgateway/v1/op/Deposit";
  const operatorId = "l22ar7MMK";
  const secretKey = "YD6MP";
  const requestDateTime = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  const stringToHash =
    functionName + requestDateTime + operatorId + secretKey + playerId;
  const signature = generateMD5Hash(stringToHash);
  const timeStamp = new Date().getTime();
  const refId = currentUserId.toString() + timeStamp.toString();

  console.log(refId);

  const requestData = {
    OperatorId: operatorId,
    RequestDateTime: requestDateTime,
    Signature: signature,
    PlayerId: playerId,
    Amount: amount,
    ReferenceId: refId,
  };

  const updateUnit = 0;
  const otherGameUnit = amount;

  const userUpdate = await User.findByIdAndUpdate(
    currentUserId,
    {
      $set: {
        unit: updateUnit,
        otherGameUnit: otherGameUnit,
      },
    },
    { new: true }
  );

  axios
    .post(apiUrl, requestData)
    .then((response) => {
      res.json({
        success: true,
        data: response.data,
      });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.stack });
    });
};
