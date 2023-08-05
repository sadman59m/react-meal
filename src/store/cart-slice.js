import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      //   const newItem = action.payload;
      //   const existingItem = state.items.find((item) => item.id === newItem.id);
      //   state.totalQuantity++;
      //   state.changed = true;
      //   if (!existingItem) {
      //     state.items.push({
      //       id: newItem.id,
      //       price: newItem.price,
      //       quantity: 1,
      //       totalPrice: newItem.price,
      //       name: newItem.title,
      //     });
      //   } else {
      //     existingItem.quantity++;
      //     existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      //   }
      const newItem = action.payload;
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
      };
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
