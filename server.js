const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const router = require('./router/routes');

// setting up the enviroment variables
dotenv.config({
    path: './.env'
});

// creating an instance of the app
const app = express();

// configuring request logger
app.use(function timeLog (req, res, next) {
    console.log(req.url, " received with following details")
    console.log("method: ", req.method)
    console.log("host: ", req.hostname)
    console.log("timestamp: ", Date.now())
    next()
});

// configuring json parser
app.use(express.json());

// configuring cookie parser
app.use(cookieParser());

// configure routers
app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT} in ${process.env.ENVIROMENT} enviroment.`)
});