const express = require('express');
const router = express.Router();

const expenseService = require('../core/services/expense');

router.route('/').get((req, res, next) => {
    return res.status(200).json({
        status: 1,
        message: 'hello world'
    });
}).post(async(req, res, next) => {
    try{
        const {amount, type, paidBy, split} = req.body;
        await expenseService.insertExpense(amount, type, paidBy, split);
    
        return res.status(200).json({
            status: 1,
            message: 'expense generated',
        });
    }
    catch(err){
        next(err);
    }
});

module.exports = router;