const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config({ path: `${__dirname}/../.env` });
//import routes
const indexRouter = require('./routes');
const userRouter = require('./routes/users');
require('./db/db');

//create app
const app = express();

//use all in app
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//decleare all route by path
app.use('/',indexRouter);
app.use('/users', userRouter);
module.exports = app;
