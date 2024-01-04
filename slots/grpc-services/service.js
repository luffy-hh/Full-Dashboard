const callbackService = require("../slotegrator/callbackService");

exports.findUser = async (call, callback) => {
  let userId = call.request.userId;
  let user_data = await callbackService.getUserBalance(userId);
  if (user_data) {
    callback(null, user_data);
  } else {
    callback({
      message: "User not found",
      code: grpc.status.INVALID_ARGUMENT,
    });
  }
};

exports.betSlotegrator = async (call, callback) => {
  let userId = call.request.userId;
  let bet_amount = call.request.bet_amount;

  let user_data = await callbackService.getUserBalance(userId);
  let user_balance = user_data.gameUnit;
  if (user_balance < bet_amount) {
    callback({
        error_code: "INSUFFICIENT_FUNDS",
        error_description: "Not enough money to continue playing",
    });
  }
  let {current_balance,transaction_id} = await callbackService.betSlot(userId, bet_amount);
  callback(null, {
    balance: current_balance,
    transaction_id:transaction_id
  });
};
