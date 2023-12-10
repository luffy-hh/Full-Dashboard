exports.getGameCategories = async (req, res) => {
  try {
    console.log("Hello Testing");
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// const axios = require("axios");
// const md5 = require("md5");

// const operatorId = "l22ar7MMK";
// const secretKey = "YD6MP";
// const currency = "MMK";

// const apiUrl =
//   "https://smakermicsvc.back138.com/api/opgateway/v1/op/gameCategories";

// function generateMD5Hash(input) {
//   return md5(input);
// }

// exports.getGameCategories = async (req, res) => {
//   try {
//     console.log("Starting Request");
//     // const newUnitValue = await MainUnit.create(req.body);
//     // res.status(201).json({
//     //   status: "success",
//     //   data: {
//     //     newUnitValue,
//     //   },
//     // });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err,
//     });
//   }
// };

// async function getGameCategories(req, res) {
//   const functionName = "gameCategories";
//   const requestDateTime = new Date().toISOString();

//   const stringToHash =
//     functionName + requestDateTime + operatorId + secretKey + currency;
//   const hash = generateMD5Hash(stringToHash);

//   console.log("Request Payload:", {
//     functionName,
//     requestDateTime,
//     operatorId,
//     currency,
//     hash,
//   });

//   try {
//     const response = await axios.post(apiUrl, {
//       functionName,
//       requestDateTime,
//       operatorId,
//       currency,
//       hash,
//     });

//     // Log API response for debugging
//     console.log("API Response:", response.data);

//     res.status(response.status).json(response.data);
//   } catch (error) {
//     console.error("API Error:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// module.exports = {
//   getGameCategories,
// };
