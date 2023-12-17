const axios = require("axios");
const crypto = require("crypto");

function generateMD5Hash(input) {
  return crypto.createHash("md5").update(input).digest("hex");
}

// Get Game List Controller
exports.getGameListController = async (req, res) => {
  const functionName = "GetGameList";
  const playerId = "123456";

  const apiUrl =
    "https://smakermicsvc.back138.com/api/opgateway/v1/op/GetGameList";
  const operatorId = "l22ar7MMK";
  const secretKey = "YD6MP";
  const requestDateTime = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  const stringToHash = functionName + requestDateTime + operatorId + secretKey;
  const signature = generateMD5Hash(stringToHash);

  const requestData = {
    OperatorId: operatorId,
    RequestDateTime: requestDateTime,
    Signature: signature,
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
