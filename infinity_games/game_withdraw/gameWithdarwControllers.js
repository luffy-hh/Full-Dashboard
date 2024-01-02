const axios = require("axios");
const crypto = require("crypto");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

function generateMD5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

// Game Withdraw
exports.gameWithdraw = async (req, res) => {
  const localApiUrl = "http://localhost:3000/api/v1/infinity/CheckBalance";

  try {
    // Use axios.get for a GET request
    const localApiResponse = await axios.post(localApiUrl);
    const currentBalance = localApiResponse.data.currentBalance;
    console.log(currentBalance);

    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;
    const userObj = await User.findById(currentUserId);
    const OtherGameUnit = userObj.otherGameUnit;

    const otherGameUnitUpdate = await User.findByIdAndUpdate(
      currentUserId,
      {
        $set: {
          otherGameUnit: currentBalance,
        },
      },
      { new: true }
    );

    // The rest of your code remains unchanged...
    const playerId = userObj.userId;
    const functionName = "Withdraw";

    const updateUserObj = await User.findById(currentUserId);

    const apiUrl =
      "https://smakermicsvc.back138.com/api/opgateway/v1/op/Withdraw";
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
      Amount: updateUserObj.otherGameUnit,
      ReferenceId: refId,
    };

    const updateUnit = updateUserObj.otherGameUnit;
    const otherGameUnit = 0;

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
          userUpdate,
        });
      })
      .catch((error) => {
        res.status(500).json({ success: false, error: error.stack });
      });
  } catch (error) {
    // Handle error for the local API request
    res.status(500).json({ success: false, error: error.stack });
  }
};
