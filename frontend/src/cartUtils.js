export const addToCart = (product) => {
  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  cart.push(product);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  window.dispatchEvent(new Event("cartUpdated"));

  alert("Added To Cart");
};

export const removeFromCart = (index) => {
  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  cart.splice(index, 1);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  window.dispatchEvent(new Event("cartUpdated"));

  return cart;
};

export const getCartCount = () => {
  return (
    JSON.parse(
      localStorage.getItem("cart")
    )?.length || 0
  );
};
