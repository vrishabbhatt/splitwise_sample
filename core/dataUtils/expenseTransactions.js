const expenseTransactionsDbUtil = require('../dbUtils/expenseTransactions');

const insertPayer = (expenseId, userId, amount) => {
    return expenseTransactionsDbUtil.insert(expenseId, userId, amount, true);
};

const insertBorrower = (expenseId, userId, amount) => {
    return expenseTransactionsDbUtil.insert(expenseId, userId, amount, false);
}

module.exports = {
    insertPayer,
    insertBorrower,
}