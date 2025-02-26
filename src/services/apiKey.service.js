const apikeyModel = require("../models/apikey.model");
crypto = require("crypto");

const findByKey = async (key) => {
  const objKey = await apikeyModel.findOne({ key: key, status: true });

  return objKey;
};

module.exports = {
  findByKey,
};
