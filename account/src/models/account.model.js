import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },

    accountType: {
      type: String,
      enum: ["saving", "current"],
      default: "saving",
    },

    balance: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["active", "closed", "suspended"],
      default: "active",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Account", accountSchema);
