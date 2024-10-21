import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/globalTypes";
import type { PayloadAction } from "@reduxjs/toolkit";

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = (): IProduct[] => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
    return [];
  }
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart: IProduct[]) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
};

interface ICart {
  products: IProduct[];
}

// Load initial state from localStorage or set to an empty array
const initialState: ICart = {
  products: loadCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existing) {
        existing.quantity = existing.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      // Save updated cart to localStorage
      saveCartToLocalStorage(state.products);
    },
    removeOneFromCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
      } else {
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      }
      // Save updated cart to localStorage
      saveCartToLocalStorage(state.products);
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      // Save updated cart to localStorage
      saveCartToLocalStorage(state.products);
    },
  },
});

export const { addToCart, removeOneFromCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
