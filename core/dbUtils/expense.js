const dbUtil = require('./dbUtil');
const {queryDb} = dbUtil;

module.exports = {
    create: (amount, splitType) => {
        const query = 'insert into expenses (amount, splitType) values (?,?)';
        const params = [amount, splitType];
        return queryDb(query, params);
    }
}