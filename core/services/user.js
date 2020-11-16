const userTransactionService = require('./userTransaction');

const fetchUserSummary = async function(userId){
    try{
        return await userTransactionService.fetchUserTransactions(userId);
    }
    catch(err){
        throw err;
    }
};

module.exports = {
    fetchUserSummary,
}