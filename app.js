const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json');

//set up db connection
const db = require('./config/db');
const {db: dbConfig} = config
const {host, port, dbName, username, password} = dbConfig;
db.createPool(host, username, password, dbName, port);


const Routes = require('./routes');
const {expenseRouter, userRouter} = Routes;

(async () => {
    try{        
        const serverPort = (config.port)? config.port : 3000;
        const app = express();
        
        app.use(bodyParser.json({
            type: '*/*'
        }));

        app.use('/expenses', expenseRouter);
        app.use('/users', userRouter);

        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            next();
        });

        //generic err handler
        app.use(function(err, req, res, next){
            if(err){
                const status = (err.status)? err.status : 500;
                return res.status(status).json({
                    status: 0,
                    message: err,
                });
            }
            next();
        });
        
        //404 route not found
        app.use(function(req,res){
            return res.status(404).json({
                status: 0,
                message: "no such route exists",
            });
        });

        app.listen(serverPort, function() {
            console.log("server started on port", serverPort);
        });


    }
    catch(err){
        console.log('mainFuncton::err: ',err);
    }
})();