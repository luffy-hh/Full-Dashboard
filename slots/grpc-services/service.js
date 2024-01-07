const TransactionRecord = require("../../transaction-record/transactionRecordModel");
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
  let bet_amount = call.request.amount;
  let aggregator_transaction_id = call.request.aggregatorTransactionId;

  let user_data = await callbackService.getUserBalance(userId);
  let user_balance = user_data.unit;
  if (user_balance < bet_amount) {
    callback({
        error_code: "INSUFFICIENT_FUNDS",
        error_description: "Not enough money to continue playing",
    });
  }
  let transaction = await TransactionRecord.findOne({additional_info:aggregator_transaction_id})

  if(transaction){
    let data = {
      balance: user_balance,
      transactionId:transaction.id
    }
    callback(null, data);
  }
  else{
    let {balance,transaction_id} = await callbackService.betSlot(userId, bet_amount);
    callback(null, {
      balance: balance,
      transactionId:transaction_id
    });
  }
};

exports.winSlotegrator = async (call, callback) => {
  let userId = call.request.userId;
  let win_amount = call.request.amount;
  let aggregator_transaction_id = call.request.aggregatorTransactionId;
  let transaction = await TransactionRecord.findOne({additional_info:aggregator_transaction_id})

  if(transaction){
    callback(null, {
      balance: transaction.after_amt,
      transactionId:transaction.id
    });
  }
  else{
    let {balance,transaction_id} = await callbackService.winSlot(userId, win_amount);
    callback(null, {
      balance: balance,
      transactionId:transaction_id
    });
  }

};


exports.refundSlotegrator = async (call, callback) => {
  let userId = call.request.userId;
  let refund_amount = call.request.amount;
  let aggregator_transaction_id = call.request.aggregatorTransactionId;
  let transaction = await TransactionRecord.findOne({additional_info:aggregator_transaction_id})
  
  if(transaction){
    callback(null, {
      balance: transaction.after_amt,
      transaction:transaction
    });
  }
  else{
    let {balance,transaction_id} = await callbackService.refundSlot(userId, refund_amount);
    callback(null, {
      balance: balance,
      transactionId:transaction_id
    });
  }

}
