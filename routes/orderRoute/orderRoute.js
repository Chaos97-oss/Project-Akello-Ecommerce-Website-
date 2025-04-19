// routes/orderRoute.js
import express from "express";
import { createOrder, getUserOrders } from "../../controller/orderController/orderController.js";
import { protect } from "../../controller/authController/signUp.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);

export default router;
