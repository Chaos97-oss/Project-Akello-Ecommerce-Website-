import express from "express";
import {protect, isAdmin} from '../../controller/authController/signUp.js';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../controller/productController/productController.js";

const router = express.Router();

router.post("/", protect, isAdmin, createProduct); // Add new product (only admin can add  new products)
router.get("/", getAllProducts); // Get all products (General)
router.get("/:id", getProductById); // Get product by ID (General)
router.put("/:id", protect, isAdmin, updateProduct); // Update product by ID (only admin can add  new products)
router.delete("/:id", protect, isAdmin, deleteProduct); // Delete product by (ID only admin can add  new products)

export default router;
