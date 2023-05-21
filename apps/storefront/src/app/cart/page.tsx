"use client";

import { useEffect } from "react";
import { useAppStore } from "../../store/store";

export default function Products() {
  const state = useAppStore();
  const { products, cartItems, orders, getProducts, addToCart, createOrder } =
    state;

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="title">
        Cart <br />
      </h1>
      <div style={{ display: "flex" }}>
        {cartItems.map((cart) => {
          return (
            <div
              key={product._id}
              style={{
                border: "1px solid lightgrey",
                borderRadius: 10,
                padding: 20,
                margin: 20,
              }}
            >
              <p>{product.name}</p>
              <p>{product.price}</p>
              <button
                onClick={() =>
                  addToCart({
                    id: product._id,
                    quantity: (product.quantity || 0) + 1,
                  })
                }
              >
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
