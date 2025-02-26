const express = require("express");
const router = express.Router();
const { apiKey } = require("../auth/checkAuth");

router.use(apiKey);
router.get("/", (req, res) => {
  res.json({ message: "API for eCommerce" });
});

module.exports = router;
