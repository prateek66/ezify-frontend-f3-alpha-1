import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector([selectCart], (cart) => cart.items);

export const selectCartItemsIds = createSelector([selectCartItems], (items) => items.map((item) => item.id));

export const selectCartItemsVendors = createSelector([selectCartItems], (items) => items.map((item) => item.vendorID));

export const selectCartItemsServices = createSelector([selectCartItems], (items) => items.map((item) => item.serviceID));

export const selectCartTotal = createSelector([selectCartItems], (items) => {
  let total = 0;
  items.map((item) => {
    if (item.active) {
      total += item.basePrice;
    }
  });
  return total;
});
