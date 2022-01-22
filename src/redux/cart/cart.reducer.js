import { CartActionTypes } from "./cart.types";
import { addItemToCart, disabledItemFromCart, removeItemFromCart } from "./cart.utlis";

const INITIAL_STATE = {
  items: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.SET_ITEM_TO_CART:
      return {
        ...state,
        items: addItemToCart(state.items, action.payload),
      };

    case CartActionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        items: removeItemFromCart(state.items, action.payload),
      };

    case CartActionTypes.DISABLE_ITEM_FROM_CART:
      let newState = JSON.parse(JSON.stringify(state));
      let selectedItem = newState.items.filter((item) => item.serviceID === action.payload)[0];
      let index = newState.items.indexOf(selectedItem);
      newState.items[index]["active"] = !newState.items[index]["active"];
      return newState;

    case CartActionTypes.EMPTY_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
