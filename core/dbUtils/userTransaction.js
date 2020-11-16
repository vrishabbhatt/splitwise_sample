const dbUtil = require('./dbUtil');
const {queryDb} = dbUtil;

module.exports = {
    insertExpenseTransaction: (paidBy, paidTo, amount, expenseId) => {
        const query = 'insert into userTransactions (paidBy, paidTo, amount, expenseId) values (?, ?, ?, ?)';
        const params = [paidBy, paidTo, amount, expenseId];
        return queryDb(query, params);
    },

    fetchPaidTransactionsByUserId: (userId) => {
        const query = 'select paidTo, sum(amount) as sum from userTransactions where paidBy = ? group by paidTo';
        const param = [userId];
        return queryDb(query, param);
    },

    fetchBorrowedTransactionsByUserId: (userId) => {
        const query = 'select paidBy, sum(amount) as sum from userTransactions where paidTo = ? group by paidBy';
        const param = [userId];
        return queryDb(query, param);
    }
}