const User = require("../../users/userModels");
const GameSoftProvider = require("../providers/providersModels");

exports.gameResult = async (req, res) => {
  try {
    const data = req.body;
    const providerObj = await GameSoftProvider.findOne({
      providerCode: data.ProductID,
    });
    const currentUserObj = await User.findOne({ userId: data.MemberName });
    const convertUnit = currentUserObj.unit / providerObj.conversionRate;
    const winLoseResult =
      data.Transactions[0].PayoutAmount == 0 ? "lose" : "win";
    const resData = {
      ErrorCode: 16,
      ErrorMessage: "Failed",
      Balance: convertUnit,
      BeforeBalance: convertUnit + data.Transactions[0].BetAmount,
    };
    if (winLoseResult === "lose") {
      resData.ErrorCode = 16;
      resData.ErrorMessage = "Failed";
      resData.Balance = convertUnit;
      resData.BeforeBalance = convertUnit + data.Transactions[0].BetAmount;
    } else {
      resData.ErrorCode = 0;
      resData.ErrorMessage = "Success";
      resData.Balance =
        convertUnit +
        data.Transactions[0].BetAmount +
        data.Transactions[0].PayoutAmount;
      resData.BeforeBalance = convertUnit + data.Transactions[0].BetAmount;

      await User.findByIdAndUpdate(User._id, {
        unit: resData.Balance * providerObj.conversionRate,
      });
    }
    res.json(resData);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
