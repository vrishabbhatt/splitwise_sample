const userTransactionDbUtil = require('../dbUtils/userTransaction');

const insertExpenseTransaction = (paidBy, paidTo, amount, expenseId) => {
    try{
        return userTransactionDbUtil.insertExpenseTransaction(paidBy, paidTo, amount, expenseId);
    }
    catch(err){
        throw err;
    }
}

const fetchPaidTransactionsByUserId = async (userId) => {
    try{
        const paidTransactions = await userTransactionDbUtil.fetchPaidTransactionsByUserId(userId);
        console.log('paidTransactions: ', paidTransactions);
        if(!paidTransactions.length) return {};
        paidTransactionsSummaryObj = {};
        paidTransactions.forEach((paidTransactionRow) => {
            const {paidTo, sum} = paidTransactionRow;
            paidTransactionsSummaryObj[paidTo] = sum;
        });
        return paidTransactionsSummaryObj;
    }
    catch(err){
        throw err;
    }
}

const fetchBorrowedTransactionsByUserId = async (userId) => {
    try{
        const borrowedTransactions = await userTransactionDbUtil.fetchBorrowedTransactionsByUserId(userId);
        console.log('borrowedTransactions: ', borrowedTransactions);
        if(!borrowedTransactions.length) return {};
        borrowedTransactionsSummaryObj = {};
        borrowedTransactionsSummaryObj.forEach((borrowedTransactionRow) => {
            const {paidBy, sum} = borrowedTransactionRow;
            borrowedTransactionsSummaryObj[paidBy] = sum;
        });
        return borrowedTransactionsSummaryObj;
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    insertExpenseTransaction,
    fetchPaidTransactionsByUserId,
    fetchBorrowedTransactionsByUserId,
};