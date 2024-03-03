const axios = require("axios");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const generateMD5HashFun = require("../../utils/generateMD5Hash");
const crypto = require("crypto");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const timeStamp = require("../../utils/timestamp");

exports.placeBet = async (req, res) => {
  console.log(req.body);
  // try {
  //   const operatorCode = "E616";
  //   const requestTime = timeStamp.getCurrentTimestamp();
  //   const token = req.headers.authorization.split(" ")[1];
  //   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //   const currentUserId = decoded.id;
  //   const userObj = await User.findById(currentUserId);
  //   const transaction = "test0123456";
  //   const memberName = userObj.userId;
  //   const messageId = `${uuidv4()}_${memberName}`;
  //   // Extract request parameters from the body
  //   const { productId } = req.body;

  //   const secretKey = "P8uzXq";
  //   const methodName = "placebet";
  //   const stringToHash = operatorCode + requestTime + methodName + secretKey;
  //   const signature = generateMD5HashFun.generateMD5Hash(stringToHash);

  //   // Transactions Object
  //   // const sampleTransaction = {
  //   //   WagerID: 221027032644145,(Yes)
  //   //   GameID: "TestGame",(Yes)
  //   //   GameRoundID: "221027032644145",(Yes)
  //   //   ValidBetAmount: 10,(Yes)
  //   //   BetAmount: 10,(Yes)
  //   //   TransactionID: "221027032644145_1",(Yes)
  //   //   PayoutAmount: 0,(Yes)
  //   //   PayoutDetail: null,(Yes)
  //   //   BetDetail: null,
  //   //   CommisionAmount: 0,
  //   //   JackpotAmount: 0,
  //   //   SettlementDate: null,
  //   //   JPBet: 0,
  //   // };

  //   // Construct your request body
  //   const requestBody = {
  //     MemberName: memberName,
  //     OperatorCode: operatorCode,
  //     ProductID: productId,
  //     MessageID: messageId,
  //     Sign: signature,
  //     RequestTime: requestTime,
  //     Transactions: transaction,
  //   };

  //   // Make the API request to the operator
  //   const response = await axios.post(
  //     "https://swmd.6633663.com/Seamless/PlaceBet",
  //     requestBody
  //   );

  //   // Handle the API response
  //   const responseData = response.data;
  //   console.log(responseData);

  //   // Send the response to the Seamless server
  //   res.json(responseData);
  // } catch (error) {
  //   console.error("Error:", error.message);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
};
