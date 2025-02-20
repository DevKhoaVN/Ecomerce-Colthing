const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _Timers = 5000;
const countConnect = () => {
  const numberConnect = mongoose.connections.length;
  return console.log(`Connected to ${numberConnect}`);
};

const checkOverLoadConnect = () => {
  setInterval(() => {
    const numberConnect = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    const maxConnections = numCores * 5;
    console.log(`count connections: ${numberConnect}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
    if (numberConnect > maxConnections) {
      console.log(
        `WARNING: Overload connections. Current: ${numberConnect}, Max: ${maxConnections}`
      );
    }
  }, _Timers);
};
module.exports = {
  countConnect,
  checkOverLoadConnect,
};
