// routes/orderRoute.js
import express from "express";
import { createOrder, getUserOrders, updateOrderStatus,deleteOrder } from "../../controller/orderController/orderController.js";
import { protect, isAdmin } from "../../controller/authController/signUp.js";
import { sendOrderOtp, verifyOrderOtp } from "../../controller/orderController/orderOtpController.js";
const router = express.Router();

router.get("/my-orders", protect, getUserOrders);
router.post("/", protect, createOrder);
router.put("/update-status/:orderId", protect, isAdmin, updateOrderStatus);
router.delete("/:orderId", protect, isAdmin, deleteOrder);
router.post("/send-otp", protect, sendOrderOtp)
router.post("/verify-otp", protect, verifyOrderOtp)
export default router;
