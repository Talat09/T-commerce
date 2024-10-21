import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/globalTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
interface ICart {
  products: IProduct[];
}
const initialState: ICart = {
  products: [],
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
    },
    removeOneFromCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
      } else{
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});
export const { addToCart, removeOneFromCart, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
