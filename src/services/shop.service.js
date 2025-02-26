const mongodb = require("mongodb");
const shopModel = require("../models/shop.model");
const findByEmail = async ({ email }) => {
  return await shopModel.findOne({ email });
};

module.exports = findByEmail;
