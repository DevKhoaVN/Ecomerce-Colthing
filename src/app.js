const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan"); // record log request
const compression = require("compression"); //
const { default: mongoose } = require("./dbs/init.mongodb");
const { checkOverLoadConnect } = require("./helper/check.connect");
const app = express();

// init middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//init database
mongoose;

//init router
app.use("/", require("./routes/index"));
app.use("/", require("./routes/acess/index"));
//hadling error

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 404;
  return res.status(status).json({
    status: "server error",
    code: error.status,
    message: error.message || "internal server error",
  });
});
module.exports = app;
