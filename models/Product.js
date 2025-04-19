import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  stock: {
    type: Number,
    default: 0, // how many of this product is available
  },
  image: {
    type: String,
    default: "", // URL or path to image file
  },
  category: {
    type: String,
    default: "General", // optional: helpful if you want to group products later
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
