import express from "express";
import accountRoute from "./account.route.js";

const router = express.Router();

router.use("/account", accountRoute);

export default router;
