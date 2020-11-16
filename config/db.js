var mysql = require('mysql2');

let connection = null;
const createPool = (host, user, password, database, port) => {
    connection = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0    
    });
}

const fetchConnection = () => {
    return connection;
}

module.exports = {
    createPool,
    fetchConnection,
    connection,
};