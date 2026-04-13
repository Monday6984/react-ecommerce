import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: String,
  items: Array,
  shipping: Object,
  total: Number,
  createdAt: String,
});

export default mongoose.model("Order", orderSchema);
