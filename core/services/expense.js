const userTransactionService = require('./userTransaction');

const expenseModel = require('../dataUtils/expense');
const expenseTransactionModel = require('../dataUtils/expenseTransactions');

const insertExpense = async (totalAmount, expenseType, paidBy, splitDetails) => {
    try{
        totalAmount = parseFloat(totalAmount);
        if(!expenseType) expenseType = 'equal';
        const paidByObj = {};

        const expenseId = await expenseModel.createExpense(totalAmount, expenseType);

        insertPayerPromiseArr = paidBy.map(payer => {
            const {userId, amount} = payer;
            paidByObj[userId] = parseFloat(amount);
            return expenseTransactionModel.insertPayer(expenseId, userId, amount);
        });

        await Promise.all(insertPayerPromiseArr);

        if(expenseType === 'equal'){
            const eachOwed = totalAmount/splitDetails.length;
            let insertBorrowerPromiseArr = [];

            splitDetails.map(borrower => {
                const {userId} = borrower;
                if(paidByObj[userId]){
                    const leftover = eachOwed - paidByObj[userId] ;
                    if(leftover < 0){
                        paidByObj[userId] = Math.abs(leftover);

                    }
                    else if(leftover === 0){
                        delete paidByObj[userId];

                    }
                    else{
                        insertBorrowerPromiseArr.push(expenseTransactionModel.insertBorrower(expenseId, userId, leftover));
                        delete paidByObj[userId];
                    }
                }else{
                    insertBorrowerPromiseArr.push(expenseTransactionModel.insertBorrower(expenseId, userId, eachOwed));
                } 
            });

            userTransactionService.createBillUserTransactionsForEqual(expenseId, eachOwed, paidByObj, splitDetails).catch(err => {
                console.log('err inserting user txns:',err);
            });
        }
        else{
            throw {name: 'validationError', message: 'split type not supported yet'};
        }
    }
    catch(err){
        throw err;
    }
};


module.exports = {
    insertExpense,
}