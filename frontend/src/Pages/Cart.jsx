import React, { useState, useEffect } from "react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { removeFromCart } from "../cartUtils";

import "../Styles/Cart.scss";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      setCartItems(
        JSON.parse(
          localStorage.getItem("cart")
        ) || []
      );
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const handleRemove = (index) => {
    const updated = removeFromCart(index);
    setCartItems(updated);
  };

  const total =
    cartItems.reduce(
      (sum, item) =>
        sum + item.price,
      0
    );

  return (
    <>
      <Header />

      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <p className="page-subtitle">
          Review your items before checkout
        </p>

        {cartItems.length === 0 ? (
          <p className="empty-cart">
            Your cart is empty. Start shopping!
          </p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="cart-item"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                />
              )}

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() =>
                  handleRemove(index)
                }
              >
                Remove
              </button>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="cart-total">
            <span>Order Total</span>
            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;
