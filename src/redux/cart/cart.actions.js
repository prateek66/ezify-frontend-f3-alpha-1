import { CartActionTypes } from "./cart.types";

export const setItemToCart = (payload) => ({
  type: CartActionTypes.SET_ITEM_TO_CART,
  payload: payload,
});
export const removeFromCart = (payload) => ({
  type: CartActionTypes.REMOVE_ITEM_FROM_CART,
  payload: payload,
});
