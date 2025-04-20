// routes/orderRoute.js
import express from "express";
import { createOrder, getUserOrders, updateOrderStatus } from "../../controller/orderController/orderController.js";
import { protect, isAdmin } from "../../controller/authController/signUp.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getUserOrders);
router.put("/update-status/:orderId", protect, isAdmin, updateOrderStatus);
export default router;
