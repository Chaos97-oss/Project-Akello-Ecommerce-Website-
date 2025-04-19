import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';

// Add item to the cart
export const addItemToCart = async (req, res) => {
  const  userId  = req.user._id; // Assumes you are passing userId in the body
  const { productId, quantity } = req.body; // Product ID and Quantity

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        userId,
        items: [
          { productId, quantity }
        ],
      });
    } else {
      // If the cart exists, add the product
      const existingProduct = cart.items.find(item => item.productId.toString() === productId);
      if (existingProduct) {
        // Update quantity if the product already exists in the cart
        existingProduct.quantity += quantity;
      } else {
        // Add new product to the cart
        cart.items.push({ productId, quantity });
      }
    }

    // Save the updated cart
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error adding item to cart" });
  }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
  const  userId = req.user._id;
   const  {productId} = req.body  

  try {
    // Find the cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the item
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    
    // Save the updated cart
    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error removing item from cart" });
  }
};
// View the user's cart
export const getUserCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId'); // Optional: populate product details
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving cart" });
  }
};
