import express from "express";
import {
  createAccount,
  getBalance,
} from "../controllers/account.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/createAccount", authMiddleware, createAccount);
router.get("/balance", authMiddleware, getBalance);

export default router;
