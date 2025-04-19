// controller/orderController/orderController.js
import Order from "../../models/Order.js";
import User from "../../models/User.js";
import Product from "../../models/Product.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }
// Fetch all products from DB and calculate total price
    let totalPrice = 0;
    const products = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      const price = product.price * item.quantity;
      totalPrice += price;

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
// Link to user
    await User.findByIdAndUpdate(req.user._id, {
      $push: { orders: newOrder._id },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// GET ORDERS FOR LOGGED IN USER
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to get orders", error });
  }
};
