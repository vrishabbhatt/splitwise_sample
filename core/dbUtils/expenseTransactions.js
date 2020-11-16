const dbUtil = require('./dbUtil');
const {queryDb} = dbUtil;

module.exports = {
    insert: (expenseId, userId, amount, isPayer) => {
        const query = 'insert into expenseTransactions (expenseId, userId, amount, paid) values (?,?,?,?)';
        const params = [expenseId, userId, amount, isPayer];
        return queryDb(query, params);
    },
}