const TransactionRecord = require("../../transaction-record/transactionRecordModel");
const User = require("../../users/userModels");
const helper = require("../../utils/helper");
exports.getUserBalance = async (userId) => {
  const user = await User.findOne({ userId: userId });
  let user_data = {
    id: 445,
    userId: user.userId,
    role: user.role,
    unit: helper.decimal(user.unit, 4),
    // gameUnit: user.gameUnit,
    // promotionUnit: user.promotionUnit,
  };

  return user_data;
};

//when player trying to make a bet.
exports.betSlot = async (userId, bet_amount,aggregator_transaction_id) => {
  //reduce user's balance, send ag commission ,etc...
  let user = await User.findOneAndUpdate(
    { userId: userId },
    { $inc: { unit: -bet_amount } },
    { new: true }
  );
  let transaction = await TransactionRecord.create({
    user_id: user._id,
    before_amt: user.unit + bet_amount,
    action_amt: bet_amount,
    after_amt: user.unit,
    type: "slot-bet",
    status: "Out",
    additional_info:aggregator_transaction_id
  });
  return {
    balance: helper.decimal(user.unit, 4),
    transaction: helper.convertTransactionMsg(transaction),
  };
};

//when player win in a game
exports.winSlot = async (userId, win_amount,aggregator_transaction_id) => {
  //increase user's balance, record transaction,etc...
  let user = await User.findOneAndUpdate(
    { userId: userId },
    { $inc: { unit: win_amount } },
    { new: true }
  );
  let transaction = await TransactionRecord.create({
    user_id: user._id,
    before_amt: user.unit - win_amount,
    action_amt: win_amount,
    after_amt: user.unit,
    type: "slot-win",
    status: "In",
    additional_info:aggregator_transaction_id,
  });
  return {
    balance: helper.decimal(user.unit, 4),
    transaction: helper.convertTransactionMsg(transaction),
  };
};

//Refund is a cash back in case bet problems.
exports.refundSlot = async (userId, refund_amount,aggregator_transaction_id) => {
  //increase user's balance, record transaction,etc...
  let user = await User.findOneAndUpdate(
    { userId: userId },
    { $inc: { unit: refund_amount } },
    { new: true }
  );
  let transaction = await TransactionRecord.create({
    user_id: user._id,
    before_amt: user.unit - refund_amount,
    action_amt: refund_amount,
    after_amt: user.unit,
    type: "slot-refund",
    status: "In",
    additional_info:aggregator_transaction_id,
  });
  return {
    balance: helper.decimal(user.unit, 4),
    transaction: helper.convertTransactionMsg(transaction),
  };
};
