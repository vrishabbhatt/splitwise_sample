const express = require('express');
const router = express.Router();

const userService = require('../core/services/user');

router.route('/summary/:userId').get(async (req, res, next) => {
    try{
        const {userId} = req.params;
        console.log(userId);
        const userSummaryObj = await userService.fetchUserSummary(userId);
        
        return res.status(200).json({
            status: 1,
            message: 'work in progress',
            data: userSummaryObj,
        });    
    }
    catch(err){
        next(err);
    }
});



module.exports = router;