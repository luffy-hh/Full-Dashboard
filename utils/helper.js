exports.convertTransactionMsg =  (transaction) => {
  return {
    transactionId: transaction.id,
    userTableId: transaction.user_id,
    beforeAmount: transaction.before_amt,
    actionAmount: transaction.action_amt,
    afterAmount: transaction.after_amt,
    type: transaction.type,
    status: transaction.status,
  };
};

exports.decimal =  (num, decimal) => {
    let result = Math.floor(num * Math.pow(10,decimal))/Math.pow(10,decimal);
    return parseFloat(result)
}