export const addDecimals = (num) => {
  return Math.round((num * 100) / 100).toFixed();
};

export const updateCart = (state) => {
  //   calculate item price
  state.itemPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //   calculate shipping price if order over $100 then free else $10 shipping
  state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

  //   calculate tax price(15%)
  state.taxPrice = addDecimals(Number(0.15 * state.itemPrice).toFixed(2));

  //   total price
  state.totalPrice = (
    Number(state.itemPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));
};