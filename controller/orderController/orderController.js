// controller/orderController/orderController.js
import Order from "../../models/Order.js";
import User from "../../models/User.js";
import Product from "../../models/Product.js";
import Cart from "../../models/Cart.js";

// CREATE ORDER FROM CART
export const createOrder = async (req, res) => {
  try {
    // Check if OTP was verified before placing order
    const user = await User.findById(req.user._id);
    if (!user.orderOtpVerified) {
      return res.status(403).json({ message: "Please verify your OTP before placing an order." });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }
// Fetch all products from DB and calculate total price
    let totalPrice = 0;
    const products = [];

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      products.push({
        product: product._id,
        quantity: item.quantity,
      });
    }
// Create the order
    const newOrder = await Order.create({
      user: req.user._id,
      products,
      totalPrice,
    });
    user.orderOtpVerified = false;
    user.orderOtp = undefined;
    user.orderOtpExpiry = undefined;
await user.save();
// Link to user
    await User.findByIdAndUpdate(req.user._id, {
      $push: { orders: newOrder._id },
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// GET ORDERS FOR LOGGED-IN USER
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Failed to get orders", error });
  }};
  //Update Order Status Admin Only//
  export const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      // Update the order status and save it
      order.status = status;
      await order.save();
  
      // Check if updatedAt is included in the response
      res.status(200).json({
        message: "Order status updated",
        order: {
          ...order.toObject(),
          updatedAt: order.updatedAt, // Return the updatedAt field
        },
      });
    } catch (error) {
      console.error("Order Status Error:", error);
      res.status(500).json({ message: "Failed to update order", error });
    }
  };
  //Delte ORDER (STRICTLY FOR ADMINS)
  export const deleteOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      await Order.findByIdAndDelete(req.params.orderId);
  
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Delete Order Error:", error);
      res.status(500).json({ message: "Failed to delete order", error });
    }
  };
  // USER CANCEL ORDER (soft delete)
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.orderId, user: req.user._id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Allow cancel only if order is not shipped or delivered
    if (["shipped", "delivered"].includes(order.status)) {
      return res.status(400).json({ message: "Cannot cancel this order" });
    }

    order.status = "cancelled";
    order.cancelledAt = new Date();
    order.cancelledByUser = true;

    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Cancel Order Error:", error);
    res.status(500).json({ message: "Failed to cancel order", error });
  }
};