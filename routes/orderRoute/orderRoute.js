// routes/orderRoute.js
import express from "express";
import { createOrder, getUserOrders, updateOrderStatus,deleteOrder } from "../../controller/orderController/orderController.js";
import { protect, isAdmin } from "../../controller/authController/signUp.js";

const router = express.Router();

router.get("/my-orders", protect, getUserOrders);
router.post("/", protect, createOrder);
router.put("/update-status/:orderId", protect, isAdmin, updateOrderStatus);
router.delete("/:orderId", protect, isAdmin, deleteOrder);
// router.post("/orders/send-otp")
// router.post("/orders/verify-otp")
export default router;
