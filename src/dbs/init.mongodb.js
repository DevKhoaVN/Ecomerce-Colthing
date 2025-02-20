const mongoose = require("mongoose");

// singleton connect to database

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose
      .connect("mongodb://localhost:27017")
      .then((_) => console.log("connect to mongodb sucess"))
      .catch((_) => console.log("connect to mongodb failure"));
  }

  static getInstance() {
    if (!Database.instance) return new Database();

    return Database.instance;
  }
}

module.exports = Database.getInstance();
