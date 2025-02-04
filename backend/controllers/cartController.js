import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // Find user and their cart data
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};  // Ensure cartData exists

    // Add or update item quantity in the cart
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    // Update user cart data in the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item added to cart!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding item to cart" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // Find user and their cart data
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData exists

    // Check if item exists and update its quantity
    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];  // Remove the item if quantity is zero
      }
    }

    // Update user cart data in the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Item removed from cart!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error removing item from cart" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find user and their cart data
    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};  // Ensure cartData exists

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching cart data" });
  }
};

export { addToCart, removeFromCart, getCart };
