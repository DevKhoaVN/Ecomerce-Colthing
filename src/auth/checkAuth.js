const { findByKey } = require("../services/apiKey.service");

const Header = {
  API_KEY: "x-api-key",
  Authorization: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[Header.API_KEY]?.toString();
    if (!key) {
      throw new Error("Invalid API key");
    }

    const objectKey = await findByKey(key);

    if (!objectKey) {
      return res.status(401).json({ message: "Forbidden error 2" });
    }

    req.objectKey = objectKey;

    return next();
  } catch (error) {
    next(error);
  }
};

const permissions = async (permissions) => {
  return (req, res, next) => {
    if (!req.objectKey.permissions) {
      return res.status(401).json({ message: "permission denied" });
    }

    console.log(req.object.permissions);

    const isPermission = req.objectKey.includes(permissions);

    if (!isPermission) {
      return res.status(401).json({ message: "Forbidden error 3" });
    }

    next();
  };
};

const asyncHandler = (asyncfn) => {
  return (req, res, next) => {
    asyncfn(req, res, next).catch(next);
  };
};

module.exports = {
  apiKey,
  permissions,
  asyncHandler,
};
