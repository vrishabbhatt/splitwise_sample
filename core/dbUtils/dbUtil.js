const db = require("../../config/db");
const {fetchConnection} = db;
const connection = fetchConnection();

module.exports = {
    queryDb: function(query, param) {
        return new Promise(function(resolve, reject) {
            try{
                connection.query(query, param,
                    function(err, results) {
                        if (err){
                            console.log("partner_db_util::queryDb:error: ",err);
                            return reject(null);  
                        } 
                        else return resolve(results);
                });
            }
            catch(err){
                reject(err)
            }
        });
    },
}