"use strict";

const mongoose = require("mongoose");
const connectString = `mongodb://localhost:27017/`;

mongoose
  .connect(connectString)
  .then(() => console.log("connect success to mongodb"))
  .catch((err) => console.log("connection error to mongodb:"));

if (1 === 0) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}

module.exports = mongoose;
