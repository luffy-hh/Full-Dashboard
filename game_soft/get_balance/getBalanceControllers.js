const bodyParser = require("body-parser");

const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const timeStamp = require("../../utils/timestamp");
const generateMD5HashFun = require("../../utils/generateMD5Hash");

exports.getBalance = async (req, res) => {
  try {
    const requestTime = timeStamp.getCurrentTimestamp();
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;
    const userObj = await User.findById(currentUserId);
    const operatorCode = "E616";
    const messageId = currentUserId.toString() + "_" + requestTime.toString();
    // Extract request parameters from the body
    const { productId } = req.body;
    // Create Sing
    const secretKey = "P8uzXq";
    const methodName = "getbalance";
    const stringToHash = operatorCode + requestTime + methodName + secretKey;
    const signature = generateMD5HashFun.generateMD5Hash(stringToHash);

    // Construct your request body
    const requestBody = {
      MemberName: userObj.userId,
      OperatorCode: operatorCode,
      ProductID: productId,
      MessageID: messageId,
      Sign: signature,
      RequestTime: requestTime,
    };

    console.log(requestBody);

    // Make the API request to the operator
    // const callbackUrl = "https://gamevegas.online";
    const callbackUrl = "https://swmd.6633663.com/Seamless/GetBalance";
    // const response = await axios.post("/Seamless/GetBalance", requestBody, {
    //   baseURL: callbackUrl,
    // });
    const response = await fetch(callbackUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });
    if (response.headers.get("content-type")?.includes("application/json")) {
      const responseData = await response.json();
      console.log(responseData);
      res.json(responseData);
    } else {
      // Handle non-JSON response (e.g., HTML error page)
      const responseText = await response.text();
      console.error("Non-JSON response:", responseText);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBalanceWithProductId = async (req, res) => {
  try {
    const requestTime = timeStamp.getCurrentTimestamp();
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;
    const userObj = await User.findById(currentUserId);
    const operatorCode = "E616";
    const messageId = currentUserId.toString() + "_" + requestTime.toString();
    // Extract request parameters from the body
    const { productId } = req.body;
    // Create Sing
    const secretKey = "P8uzXq";
    const methodName = "getbalance";
    const stringToHash = operatorCode + requestTime + methodName + secretKey;
    const signature = generateMD5HashFun.generateMD5Hash(stringToHash);

    // Construct your request body
    const requestBody = {
      MemberName: userObj.userId,
      OperatorCode: operatorCode,
      ProductID: productId,
      MessageID: messageId,
      Sign: signature,
      RequestTime: requestTime,
    };

    // Make the API request to the operator
    const response = await axios.post(
      "https://swmd.6633663.com/Seamless/GetBalance",
      requestBody
    );

    // Handle the API response
    const responseData = response.data;
    console.log(responseData);

    // Send the response to the Seamless server
    res.json(responseData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
