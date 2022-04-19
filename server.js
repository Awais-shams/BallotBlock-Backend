const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const router = require('./router/routes');

// import helpers
const currentTimestamp = require('./_helpers/currentDate.js');

// setting up the enviroment variables

// creating an instance of the app
const app = express();

// set cors policy to allow the front end
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus:200
};
app.use(cors(corsOptions));

// configuring request logger
app.use(function timeLog (req, res, next) {
    console.log(req.url, " received with following details")
    console.log("method: ", req.method)
    console.log("host: ", req.hostname)
    console.log("timestamp: ", currentTimestamp())
    next()
});

// configuring json parser
app.use(express.json());

// configuring cookie parser
app.use(cookieParser());

// configure routers
app.use('/', router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://${process.env.HOST}:${process.env.PORT} in ${process.env.NODE_ENV} enviroment.`)
});