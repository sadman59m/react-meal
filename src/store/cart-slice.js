import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      // state.changed = true;
      const updatedTotalAmount =
        state.totalAmount + newItem.price * newItem.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + newItem.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(newItem);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
        changed: true,
      };
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      state.changed = true;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalAmount = state.totalAmount - existingItem.price;
      if (state.totalAmount < 0) state.totalAmount = 0;
      state.changed = true;
      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.amount--;
      }
    },
    resetCart(state) {
      state.changed = true;
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
