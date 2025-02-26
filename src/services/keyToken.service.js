const keyTokenModel = require("../models/key.model");
const { Types } = require("mongoose");

class KeyTokenService {
  // Create token and save to database

  static async createKeyTokenService(
    userId,
    publicKey,
    privateKey,
    refreshToken
  ) {
    try {
      if (!userId) throw new Error("❌ User ID is required");

      console.log("🔹 Checking for existing token for user:", userId);

      const update = {
        $set: {
          publickey: publicKey, // ✅ Đúng với schema
          privatekey: privateKey,
          refeshToken: refreshToken, // ✅ Đúng với schema
          updatedAt: new Date(),
        },
        $setOnInsert: {
          refeshTokenUsed: [],
        },
      };

      const result = await keyTokenModel.updateOne({ user: userId }, update, {
        upsert: true,
        new: true,
      });

      if (result.modifiedCount > 0) {
        console.log("✅ Token successfully updated");
      } else if (result.upsertedCount > 0) {
        console.log("✅ Token successfully created");
      } else {
        console.log("⚠️ No changes made to the token");
      }

      return publicKey;
    } catch (error) {
      console.error("❌ Error in createKeyTokenService:", error.message);
      return null;
    }
  }

  static async findUserById(userId) {
    return await keyTokenModel.findOne({ user: userId });
  }

  static async removeKeyById(id) {
    return await keyTokenModel.deleteOne({ _id: id });
  }

  static async findByRefreshTokenUsed(refreshToken) {
    return await keyTokenModel.findOne({ refeshTokenUsed: refreshToken });
  }
}

// Export class đúng cách
module.exports = {
  KeyTokenService,
};
