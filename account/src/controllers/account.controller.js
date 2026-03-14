import Account from "../models/account.model.js";

export const createAccount = async (req, res) => {
  try {
    const account = await Account.create({
      owner: req.user.id,
      accountNumber: generateAccountNumber(),
      accountType,
      balance,
      currency,
      status,
    });
    return res.status(201).json({ message: "Account Created", account });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getBalance = async (req, res) => {
  try {
    const account = await Account.findOne({
      owner: req.user.id,
    });
    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }
    return res.status(200).json({ message: "Balance Retrieved", account });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
