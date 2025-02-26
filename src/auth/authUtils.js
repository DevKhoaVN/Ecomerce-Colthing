const jwt = require("jsonwebtoken");
const { asyncHandler } = require("./checkAuth");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../core/error.respone");
const { KeyTokenService } = require("../services/keyToken.service");

const Header = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  Authorization: "authorization",
};

// creaaccesste  token and refresh token
const createTokenPair = async ({ payload, publicKey, privateKey }) => {
  console.log("public key : " + publicKey);
  try {
    const accessToken = jwt.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    // ✅ Trả về token dưới dạng object
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token Creation Error:", error);
    throw error; // Nên throw lỗi để bắt lỗi ở caller
  }
};

const authencation = asyncHandler(async (req, res, next) => {
  /*
  1. Check userId missing
  2.get acessToken
  3. verify acessToken
  4. check user trong dbs
  5. check keyStore with userId
  6. OK all => next()

   */

  // Check userId missing
  const userId = req.headers[Header.CLIENT_ID];
  if (!userId) {
    throw new BadRequestError("Header have not userId");
  }

  const keyStore = await KeyTokenService.findUserById(userId);

  if (!keyStore) {
    throw new NotFoundError("User not found");
  }

  console.log(keyStore);
  const acessToken = req.headers[Header.Authorization];
  if (!acessToken) {
    throw new UnauthorizedError("Header have not acessToken");
  }

  try {
    const decodedUser = jwt.verify(acessToken, keyStore.publickey);

    console.log("decode :   " + decodedUser.userId);
    if (userId != decodedUser.userId) {
      throw new UnauthorizedError("UserId invalid");
    }

    req.keyStore = keyStore;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = {
  createTokenPair,
  authencation,
};
