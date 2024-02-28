const axios = require("axios");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const timeStamp = require("../../utils/timestamp");
const generateMD5HashFun = require("../../utils/generateMD5Hash");

// Get Game List
exports.getGameList = async (req, res) => {
  try {
    const requestTime = timeStamp.getCurrentTimestamp();
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;
    const userObj = await User.findById(currentUserId);
    let { gameType, platform, productId } = req.body;
    const secretKey = "P8uzXq";
    const methodName = "getgamelist";
    const operatorCode = "E616";
    const stringToHash = operatorCode + requestTime + methodName + secretKey;
    const signature = generateMD5HashFun.generateMD5Hash(stringToHash);

    // Construct your request body
    const requestBody = {
      OperatorCode: operatorCode,
      MemberName: userObj.userId,
      DisplayName: userObj.name,
      ProductID: productId,
      GameType: gameType,
      LanguageCode: 1,
      Platform: platform,
      Sign: signature,
      RequestTime: requestTime,
    };
    console.log(requestBody);

    // Make the API request
    const response = await axios.post(
      "https://swmd.6633663.com/Seamless/GetGameList",
      requestBody
    );

    // Handle the API response
    const responseData = response.data;
    console.log(responseData);

    // Send the response to the client
    res.json(responseData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
