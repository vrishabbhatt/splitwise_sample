
const userTransactionModel = require('../dataUtils/userTransaction');

const createBillUserTransactionsForEqual = async (expenseId, eachOwed, paidByObj, splitDetails) => {
    try{
        let userTxObj = [];

        if(!Object.keys(paidByObj).length) return;
        
        splitDetails.forEach(borrower => {
            const {userId} = borrower;
            if(paidByObj[userId]) return;
            
            const payerUserId = Object.keys(paidByObj)[0];
            const paidAmount = paidByObj[payerUserId];
            
            let paidOut = eachOwed;
            let remainingLendingAmount = paidAmount - eachOwed;
            
            
            if(remainingLendingAmount <= 0){
                paidOut = paidAmount;
                delete paidByObj[payerUserId];
            }else{
                paidByObj[payerUserId] = remainingLendingAmount;
            }

            userTxObj.push(userTransactionModel.insertExpenseTransaction(payerUserId, userId, paidOut, expenseId));
        });

        await Promise.all(userTxObj);
    }
    catch(err){
        throw err;
    }
};

const fetchUserTransactions = async (userId) => {
    try{
        const paidTransactionsSummaryObj = await userTransactionModel.fetchPaidTransactionsByUserId(userId);
        const borrowedTransactionsSummaryObj = await userTransactionModel.fetchBorrowedTransactionsByUserId(userId);
        return {
            paidTransactionsSummaryObj,
            borrowedTransactionsSummaryObj,
        }
    }
    catch(err){

    }
}

module.exports = {
    createBillUserTransactionsForEqual,
    fetchUserTransactions,
}   