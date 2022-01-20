export const addItemToCart = (cartItems, cartItemToAdd) => {
  const serviceIDs = cartItems.map(({ serviceID }) => serviceID);
  if (!serviceIDs.includes(cartItemToAdd.serviceID)) {
    return [...cartItems, cartItemToAdd];
  } else {
    return [...cartItems];
  }
};

export const removeItemFromCart = (cartItems, id) => {
  const serviceIDs = cartItems.filter((item) => item.serviceID !== id);
  return [...serviceIDs];
};
