const expenseDbUtil = require('../dbUtils/expense')

const createExpense = async(amount, splitType) => {
    try{
        const createExpanseResult = await expenseDbUtil.create(amount, splitType);
        return createExpanseResult.insertId;
    }
    catch(err){
        throw err;
    }
};


module.exports = {
    createExpense,
};