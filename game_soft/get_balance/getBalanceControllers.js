const User = require("../../users/userModels");
const GameSoftProvider = require("../providers/providersModels");

exports.getBalance = async (req, res) => {
  try {
    console.log(req.body);
    const validUser = await User.findOne({ userId: req.body.MemberName });
    const providerObj = await GameSoftProvider.findOne({
      providerCode: req.body.ProductID,
    });
    const convertUnit = validUser.unit / providerObj.conversionRate;
    if (validUser) {
      const resData = {
        ErrorCode: 0,
        ErrorMessage: "Success",
        Balance: convertUnit,
        BeforeBalance: 0,
      };
      res.json(resData);
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
