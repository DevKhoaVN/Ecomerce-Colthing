const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan"); // record log request
const compression = require("compression"); //
const app = express();

// init middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

//init database

//init router

//hadling error
module.exports = app;
