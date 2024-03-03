const axios = require("axios");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const timeStamp = require("../../utils/timestamp");
const generateMD5HashFun = require("../../utils/generateMD5Hash");

exports.mobileLogin = async (req, res) => {
  try {
    const requestTime = timeStamp.getCurrentTimestamp();
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;
    const userObj = await User.findById(currentUserId);
    const secretKey = "P8uzXq";
    const methodName = "mobilelogin";
    const operatorCode = "E616";
    const stringToHash = operatorCode + requestTime + methodName + secretKey;
    const signature = generateMD5HashFun.generateMD5Hash(stringToHash);
    const password = "HelloAR7MM";
    const messageId = `${requestTime}+${userObj.userId}`;
    const { productId } = req.body;

    const requestBody = {
      Password: password,
      MemberName: userObj.userId,
      OperatorCode: operatorCode,
      ProductID: productId,
      MessageID: messageId,
      Sign: signature,
      RequestTime: requestTime,
    };

    const response = await axios.post(
      "https://swmd.6633663.com/Seamless/MobileLogin",
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
