const axios = require("axios");
const crypto = require("crypto");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

function generateMD5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

// Create Player Controller
exports.createPlayerController = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUserId = decoded.id;
  const userObj = await User.findById(currentUserId);

  const playerId = userObj.userId;
  const functionName = "CreatePlayer";

  const apiUrl =
    "https://smakermicsvc.back138.com/api/opgateway/v1/op/CreatePlayer";
  const operatorId = "l22ar7MMK";
  const secretKey = "YD6MP";
  const requestDateTime = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  const stringToHash =
    functionName + requestDateTime + operatorId + secretKey + playerId;
  const signature = generateMD5Hash(stringToHash);

  console.log(signature);

  const requestData = {
    OperatorId: operatorId,
    RequestDateTime: requestDateTime,
    Signature: signature,
    PlayerId: playerId,
  };

  axios
    .post(apiUrl, requestData)
    .then((response) => {
      res.json({ success: true, data: response.data });
    })
    .catch((error) => {
      res.status(500).json({ success: false, error: error.message });
    });
};
