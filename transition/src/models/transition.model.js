import mongoose from "mongoose";

const transitionSchema = new mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be greater than or equal to 0"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "completed", "failed"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
    idempotencyKey: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Transition", transitionSchema);
