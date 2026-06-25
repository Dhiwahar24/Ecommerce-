import React from "react";
import { addToCart } from "../cartUtils";
import productImg from "../Assets/ben.jpeg";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img
          src={productImg}
          alt={product.name}
        />
      </div>

      <div className="product-body">
        <h3>{product.name}</h3>

        <p className="price">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <button
          onClick={() =>
            addToCart({
              ...product,
              image: productImg
            })
          }
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
