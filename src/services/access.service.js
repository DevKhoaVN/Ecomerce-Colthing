const shopModel = require("../models/shop.model");
const { KeyTokenService } = require("./keyToken.service");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createTokenPair } = require("../auth/authUtils");
const jwt = require("jsonwebtoken");
const { getInforData } = require("../utils/index");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
  UnauthorizedError,
} = require("../core/error.respone");
const findByEmail = require("./shop.service");
const saltRounds = 10;

const roleShop = {
  SHOP: "Shop",
  ADMIN: "Admin",
  WRITE: "Write",
  EDITOR: "Editor",
};
class AcessService {
  async signUp({ name, password, email }) {
    try {
      //  check email exists
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        throw new ConflictError("Shop already exists");
      }

      // ✅ Hash password
      const passwordHash = bcrypt.hashSync(password, saltRounds);

      const newShop = new shopModel({
        name: name,
        password: passwordHash,
        email: email,
        role: roleShop.SHOP,
      });

      await newShop.save();

      // ✅ Tạo publicKey và privateKey

      // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      //   modulusLength: 4096,
      //   publicKeyEncoding: { type: "spki", format: "pem" }, // Định dạng đúng
      //   privateKeyEncoding: { type: "pkcs8", format: "pem" },
      // });

      const publicKey = crypto.randomBytes(64).toString("hex");
      const privateKey = crypto.randomBytes(64).toString("hex");

      console.log("Public Key:", publicKey);
      console.log("Private Key:", privateKey);

      // ✅ Lưu publicKey vào database
      const tokens = await KeyTokenService.createKeyTokenService(
        newShop._id,
        publicKey,
        privateKey
      );

      if (!tokens) {
        throw new BadRequestError("Create token failed");
      }

      // ✅ Tạo access token và refresh token
      const token = await createTokenPair(
        { user: newShop, publicKey },
        publicKey,
        privateKey
      );

      if (token) {
        return {
          code: "201",
          message: "Đăng ký thành công",
          data: {
            shop: getInforData({
              fileds: ["_id", "name", "email"],
              object: newShop,
            }),
            token: token,
          },
        };
      }
    } catch (error) {
      console.error("SignUp Error:", error);
      throw error;
    }
  }

  async logIn({ email, password, refreshToken = null }) {
    //  check email exists
    const foundEmailShop = await findByEmail({ email });

    if (!foundEmailShop) {
      throw new NotFoundError("Email not found");
    }

    //check password exists
    const isMatchPassowrd = await bcrypt.compare(
      password,
      foundEmailShop.password
    );
    if (!isMatchPassowrd) {
      throw new AuthencationError("Password is incorrect");
    }

    const publicKey = crypto.randomBytes(64).toString("hex");
    const privateKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair({
      payload: { userId: foundEmailShop._id, email },
      publicKey,
      privateKey,
    });

    console.log("resssss: " + tokens.refreshToken);
    console.log("object :" + foundEmailShop._id);
    await KeyTokenService.createKeyTokenService(
      foundEmailShop._id,
      publicKey,
      privateKey,
      tokens.refreshToken
    );
    return {
      shop: getInforData({
        fileds: ["_id", "name", "email"],
        object: foundEmailShop,
      }),
      tokens,
    };
  }

  async logOut(keyStore) {
    console.log("Key to Delete: " + keyStore);
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);
    console.log({ delKey });
    return delKey;
  }

  async handleRefreshToken(refreshToken) {
    console.log("heloooo");
    // check refresh token reused
    const foundToken = await KeyTokenService.findByRefreshTokenUsed(
      refreshToken
    );

    if (foundToken) {
      const { userId, email } = await jwt.verify(
        refreshToken,
        foundToken.privatekey
      );
      console.log({ userId, email });

      // delete keytoken in keystore
      await KeyTokenService.removeKeyById(userId);
      throw new AuthencationError("Something wrong happened ! please re login");
    }

    // not yet used
    const holderShop = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holderShop) {
      throw new UnauthorizedError("Shop not registered 1");
    }

    console.log("hodlershop : " + holderShop);
    // verify token
    const { userId, email } = await jwt.verify(
      refreshToken,
      holderShop.privatekey
    );
    console.log(`handle provde refresh token::acount:${userId}-${email}`);

    //check email exists

    const foundEmailShop = await findByEmail({ email });
    if (!foundEmailShop) throw new UnauthorizedError("Shop not registered 2");

    // create new pair of key
    const tokens = await createTokenPair({
      payload: { userId, email },
      publicKey: holderShop.publickey,
      privateKey: holderShop.privatekey,
    });

    //update tpken

    await foundEmailShop.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });
  }
}

module.exports = new AcessService();
