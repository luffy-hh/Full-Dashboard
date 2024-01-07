const TransactionRecord = require("../../transaction-record/transactionRecordModel");
const callbackService = require("../slotegrator/callbackService");
const helper = require("../../utils/helper");

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
      balance: transaction.after_amt,
      transaction:helper.convertTransactionMsg(transaction)
    }
    callback(null, data);
  }
  else{
    let {balance,transaction} = await callbackService.betSlot(userId, bet_amount,aggregator_transaction_id);
    callback(null, {
      balance: balance,
      transaction:helper.convertTransactionMsg(transaction)
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
      transaction:helper.convertTransactionMsg(transaction)
    });
  }
  else{
    let {balance,transaction} = await callbackService.winSlot(userId, win_amount,aggregator_transaction_id);
    callback(null, {
      balance: balance,
      transaction:helper.convertTransactionMsg(transaction)
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
      transaction:helper.convertTransactionMsg(transaction)
    });
  }
  else{
    let {balance,transaction} = await callbackService.refundSlot(userId, refund_amount,aggregator_transaction_id);
    callback(null, {
      balance: balance,
      transaction:helper.convertTransactionMsg(transaction)
    });
  }

}
