import express from 'express';
import { addItemToCart, removeItemFromCart, getUserCart } from '../../controller/cartController/cartController.js';
import signUp, { protect, isAdmin } from '../../controller/authController/signUp.js';
const router = express.Router();

// Add item to the cart
router.post('/add', protect, addItemToCart);//to make sure only authorized users can add to cart

// Remove item from the cart
router.delete('/remove', protect, removeItemFromCart);//to make sure only authorized users can remove from cart

//  View cart
router.get('/my-cart', protect, getUserCart); 

export default router;
