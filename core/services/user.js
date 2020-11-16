const userTransactionService = require('./userTransaction');

const fetchUserSummary = async function(userId){
    try{
        const userTransactions = await userTransactionService.fetchUserTransactions(userId);
        const {paidTransactionsSummaryObj, borrowedTransactionsSummaryObj} = userTransactions 
        const summaryObj = {};
        
        Object.keys(paidTransactionsSummaryObj).forEach((userId) => {
            const paidAmount = paidTransactionsSummaryObj[userId];
            let borrowedAmount = 0;
            
            if(borrowedTransactionsSummaryObj[userId]){
                borrowedAmount =  borrowedTransactionsSummaryObj[userId];
                delete borrowedTransactionsSummaryObj[userId];
            }

            const amount = paidAmount - borrowedAmount;
            summaryObj[userId] = amount;
        });

        Object.keys(borrowedTransactionsSummaryObj).forEach(userId => {
            summaryObj[userId] = -Math.abs(borrowedTransactionsSummaryObj[userId]);
        });

        return summaryObj;
    }
    catch(err){
        throw err;
    }
};

module.exports = {
    fetchUserSummary,
}