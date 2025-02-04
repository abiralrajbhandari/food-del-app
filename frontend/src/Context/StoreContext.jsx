//ref
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [food_list, setFoodList] = useState([]);
  const url = "https://food-del-app-backend-45pk.onrender.com";

  // Fetch food list data from the database
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Load cart data from localStorage or API
  const loadCartData = async () => {
    try {
      const localCartData = localStorage.getItem("cartData");
      if (localCartData) {
        const parsedCart = JSON.parse(localCartData);
        setCartItems(parsedCart); // Load from localStorage if exists
        validateCartItems(parsedCart); // Ensure cart items match food_list
      } else if (token) {
        const response = await axios.post(
          url + "/api/cart/get",
          {},
          { headers: { token } }
        );
        const fetchedCart = response.data.cartData;
        setCartItems(fetchedCart);
        validateCartItems(fetchedCart); // Ensure fetched cart items match food_list
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  // Validate cart items against food_list
  const validateCartItems = (cart) => {
    if (food_list.length === 0) return; // Skip validation if food_list is empty

    const validCartItems = Object.keys(cart).reduce((validCart, itemId) => {
      if (food_list.some((product) => product._id === itemId)) {
        validCart[itemId] = cart[itemId];
      }
      return validCart;
    }, {});

    // Update cart items only if there's a mismatch
    if (JSON.stringify(cart) !== JSON.stringify(validCartItems)) {
      setCartItems(validCartItems);
      localStorage.setItem("cartData", JSON.stringify(validCartItems));
    }
  };

  // Add to cart functionality
  const addToCart = async (itemId) => {
    if (!token) {
      return alert("Please log in to add items to the cart");
    }

    let updatedCart = { ...cartItems };
    if (!updatedCart[itemId]) {
      updatedCart[itemId] = 1;
    } else {
      updatedCart[itemId] += 1;
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartData", JSON.stringify(updatedCart)); // Save to localStorage

    try {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Remove from cart functionality
  const removeFromCart = async (itemId) => {
    if (!token) {
      return alert("Please log in to remove items from the cart");
    }

    let updatedCart = { ...cartItems };

    if (updatedCart[itemId] && updatedCart[itemId] > 0) {
      updatedCart[itemId] -= 1;
      if (updatedCart[itemId] === 0) {
        delete updatedCart[itemId]; // Remove item if quantity becomes 0
      }

      setCartItems(updatedCart);
      localStorage.setItem("cartData", JSON.stringify(updatedCart)); // Save to localStorage

      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  // Function to get the total price of the items in the cart
  const getTotalCartAmount = () => {
    // If food_list is not loaded yet, we return 0
    if (!food_list.length) return 0;
    return Object.keys(cartItems).reduce((total, itemId) => {
      const product = food_list.find((item) => item._id === itemId);
      if (product) {
        return total + product.price * cartItems[itemId];
      }
      return total;
    }, 0);
  };

  // New function to get the total item count (useful for a notification dot)
  const getTotalItemsCount = () => {
    return Object.values(cartItems).reduce(
      (sum, quantity) => sum + quantity,
      0
    );
  };

  // Fetch food list and load cart data on component mount
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      loadCartData();
    };
    loadData();
  }, []);

  // Re-validate cart items whenever food_list changes
  useEffect(() => {
    validateCartItems(cartItems);
  }, [food_list]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount, // total price
    getTotalItemsCount, // total count (for dot/badge)
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
