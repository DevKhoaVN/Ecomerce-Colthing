const mongoose = require("mongoose");
const {
  db: { host, port, dbname },
} = require("../configs/config.mongodb.js");

// singleton connect to database

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose
      .connect(`mongodb://${host}:${port}`) // "mongodb://localhost:27017"
      .then((_) =>
        console.log(
          "connect to mongodb sucess" + `mongodb: ${host}:${port}:${dbname}`
        )
      )
      .catch((_) => console.log("connect to mongodb failure"));
  }

  static getInstance() {
    if (!Database.instance) return new Database();

    return Database.instance;
  }
}

module.exports = Database.getInstance();
