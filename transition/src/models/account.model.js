import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ownerEmail: {
      type: String,
      trim: true,
    },
    ownerName: {
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
      },
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
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
