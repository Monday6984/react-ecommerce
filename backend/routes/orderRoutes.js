import express from "express";
import Order from "../models/Order.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const order = await Order.create({
    ...req.body,
    user: req.user, // from token
  });
  res.json(order);
});

router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user });
  res.json(orders);
});

export default router;
