import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
  accountId: {
    type: String,
    ref: "Account",
    required: true,
    index: true,
    immutable: true,
  },
  transitionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transition",
    required: true,
    index: true,
    immutable: true,
  },
  amount: {
    type: Number,
    required: true,
    immutable: true,
  },
  type: {
    type: String,
    enum: {
      values: ["credit", "debit"],
      message: "{VALUE} is not a valid type",
    },
    required: true,
    immutable: true,
  },
});

function preventLedgerModification() {
  throw new Error("Ledger cannot be modified");
}

ledgerSchema.pre("findOneAndUpdate", preventLedgerModification);
ledgerSchema.pre("findOneAndReplace", preventLedgerModification);
ledgerSchema.pre("findOneAndDelete", preventLedgerModification);
ledgerSchema.pre("findByIdAndUpdate", preventLedgerModification);
ledgerSchema.pre("findByIdAndReplace", preventLedgerModification);
ledgerSchema.pre("findByIdAndDelete", preventLedgerModification);
ledgerSchema.pre("updateOne", preventLedgerModification);
ledgerSchema.pre("updateMany", preventLedgerModification);
ledgerSchema.pre("deleteOne", preventLedgerModification);
ledgerSchema.pre("deleteMany", preventLedgerModification);
ledgerSchema.pre("save", preventLedgerModification);
ledgerSchema.pre("remove", preventLedgerModification);
ledgerSchema.pre("delete", preventLedgerModification);

export default mongoose.model("Ledger", ledgerSchema);
