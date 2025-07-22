import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://back2-2z57.onrender.com";
const CART_STORAGE_KEY = 'almas_dimas_cart';

// Axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to axios headers if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const getLocalCart = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : { items: [], total: 0, subtotal: 0, tax: 0, shipping: 0 };
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return { items: [], total: 0, subtotal: 0, tax: 0, shipping: 0 };
  }
};

const saveLocalCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const calculateCartTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.2; // 20% TVA
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + tax + shipping;
  return { subtotal, tax, shipping, total };
};

export const cartService = {
  getCart: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Logged-in user: get cart from backend
      try {
        const response = await api.get('/api/cart');
        return {
          success: true,
          cart: response.data.cart
        };
      } catch (error) {
        console.error('Error fetching backend cart:', error);
        // fallback to local cart on error
        const localCart = getLocalCart();
        const totals = calculateCartTotals(localCart.items);
        return {
          success: false,
          cart: { ...localCart, ...totals },
          error: error.message
        };
      }
    } else {
      // Guest user: use localStorage
      const localCart = getLocalCart();
      const totals = calculateCartTotals(localCart.items);
      return {
        success: true,
        cart: { ...localCart, ...totals }
      };
    }
  },

  addItem: async (product, quantity = 1, options = {}) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Send add to backend cart
      try {
        const response = await api.post('/api/cart/add-item', {
          productId: product.id,
          quantity,
          options
        });
        return {
          success: true,
          cart: response.data.cart,
          message: 'Article ajouté au panier (backend)'
        };
      } catch (error) {
        console.error('Backend addItem error:', error);
        return { success: false, error: error.message };
      }
    } else {
      // Local storage fallback
      const cart = getLocalCart();
      const existingItemIndex = cart.items.findIndex(item =>
        item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options)
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '/images/placeholder.jpg',
          quantity,
          options,
          stockQuantity: product.stockQuantity
        });
      }

      const totals = calculateCartTotals(cart.items);
      const updatedCart = { ...cart, ...totals };
      saveLocalCart(updatedCart);

      return {
        success: true,
        cart: updatedCart,
        message: 'Article ajouté au panier (local)'
      };
    }
  },

  updateQuantity: async (itemId, quantity) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.put('/api/cart/update-item', { itemId, quantity });
        return {
          success: true,
          cart: response.data.cart
        };
      } catch (error) {
        console.error('Backend updateQuantity error:', error);
        return { success: false, error: error.message };
      }
    } else {
      const cart = getLocalCart();
      const itemIndex = cart.items.findIndex(item => item.id === itemId);
      if (itemIndex === -1) throw new Error('Article non trouvé dans le panier');

      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      const totals = calculateCartTotals(cart.items);
      const updatedCart = { ...cart, ...totals };
      saveLocalCart(updatedCart);

      return {
        success: true,
        cart: updatedCart
      };
    }
  },

  removeItem: async (itemId) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.delete(`/api/cart/remove-item/${itemId}`);
        return {
          success: true,
          cart: response.data.cart,
          message: 'Article supprimé du panier (backend)'
        };
      } catch (error) {
        console.error('Backend removeItem error:', error);
        return { success: false, error: error.message };
      }
    } else {
      const cart = getLocalCart();
      cart.items = cart.items.filter(item => item.id !== itemId);

      const totals = calculateCartTotals(cart.items);
      const updatedCart = { ...cart, ...totals };
      saveLocalCart(updatedCart);

      return {
        success: true,
        cart: updatedCart,
        message: 'Article supprimé du panier (local)'
      };
    }
  },

  clearCart: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.post('/api/cart/clear');
        return {
          success: true,
          cart: response.data.cart,
          message: 'Panier vidé (backend)'
        };
      } catch (error) {
        console.error('Backend clearCart error:', error);
        return { success: false, error: error.message };
      }
    } else {
      const emptyCart = { items: [], total: 0, subtotal: 0, tax: 0, shipping: 0 };
      saveLocalCart(emptyCart);
      return {
        success: true,
        cart: emptyCart,
        message: 'Panier vidé (local)'
      };
    }
  },

  getCartItemCount: () => {
    try {
      const cart = getLocalCart();
      return cart.items.reduce((count, item) => count + item.quantity, 0);
    } catch (error) {
      console.error('Error getting cart item count:', error);
      return 0;
    }
  },

  isInCart: (productId) => {
    try {
      const cart = getLocalCart();
      return cart.items.some(item => item.id === productId);
    } catch (error) {
      console.error('Error checking if item is in cart:', error);
      return false;
    }
  }
};

export default cartService;
