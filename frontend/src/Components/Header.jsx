import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCartCount } from "../cartUtils";
import { getLoggedInUser } from "../api/AuthAPI";
import "../Styles/Header.scss";

function Header({
  search = "",
  setSearch = () => {}
}) {
  const [cartCount, setCartCount] = useState(getCartCount());
  const [user, setUser] = useState(getLoggedInUser());

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <header className="header">
      <div className="logo">
        MiniStore
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Products"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <nav>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart" className="cart-link">
          Cart ({cartCount})
        </Link>
        {user ? (
          <>
            <span className="user-greeting">
              Hi, {user.split("@")[0]}
            </span>
            <button
              type="button"
              className="nav-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="signup-link">
              Sign Up
            </Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
