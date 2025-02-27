"use strict";
const AcessService = require("../services/access.service");
const { asyncHandler } = require("../auth/checkAuth");
const { CREATED, SucessResponse } = require("../core/sucess.respone");
class AccessController {
  async signUp(req, res, next) {
    new CREATED({
      message: "Register Sucessfully,",
      metadata: await AcessService.signUp(req.body),
    }).send(res);
  }

  async logIn(req, res, next) {
    new SucessResponse({
      message: "Login Sucessfully,",
      metadata: await AcessService.logIn(req.body),
    }).send(res);
  }

  async logOut(req, res, next) {
    new SucessResponse({
      message: "Logout Sucessfully,",
      metadata: await AcessService.logOut(req.keyStore),
    }).send(res);
  }

  async refresToken(req, res, next) {
    new SucessResponse({
      message: "refreshToken Sucessfully,",
      metadata: await AcessService.handleRefreshToken(req.body.refreshToken),
    }).send(res);
  }
}
module.exports = new AccessController();
