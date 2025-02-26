// !dmbg
const { Schema, model, Types } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "shop";
const COLLECTION_NAME = "shops";
// Declare the Schema of the Mongo model
var shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "inactive",
      enum: ["active", "inactive"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Array,
      default: [],
    },
  },
  { collection: COLLECTION_NAME, timestamps: true }
);

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);
