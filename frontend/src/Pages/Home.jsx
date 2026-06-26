import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/ProductAPI";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProductCard from "../Components/ProductCard";

import productImg from "../Assets/ben.jpeg";

import "../Styles/Home.scss";

function Home() {
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      nav("/home");
    }
  }, [nav]);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const scrollToProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
      />

      <section className="hero">
        <div className="hero-left">
          <h1>
            Shop Smart,
            Shop Better
          </h1>

          <p>
            Discover the latest products at affordable prices.
          </p>

          <button onClick={scrollToProducts}>
            Shop Now
          </button>
        </div>

        <div className="hero-right">
          <img
            src={productImg}
            alt="Hero"
          />
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="products-header">
          <h2>Featured Products</h2>
          <p>Hand-picked items just for you</p>
        </div>

        <div className="products">
          {filteredProducts.length === 0 ? (
            <p className="no-products">
              {search
                ? `No products found for "${search}"`
                : "No products available."}
            </p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
