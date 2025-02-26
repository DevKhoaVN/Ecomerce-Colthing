const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const { asyncHandler } = require("../../auth/checkAuth");
const acessController = require("../../controllers/acess.controller");
const { authencation } = require("../../auth/authUtils");

// post/shop/signup

router.post("/v1/api/shop/signup", asyncHandler(acessController.signUp));
router.post("/v1/api/shop/login", asyncHandler(acessController.logIn));

router.use(authencation);
// authencation

router.post("/v1/api/shop/logout", asyncHandler(acessController.logOut));

module.exports = router;
