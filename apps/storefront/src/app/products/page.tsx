"use client";

import { useEffect } from "react";
import { useAppStore } from "../../store/store";
import { redirect } from "next/navigation";

export default function Products() {
  const state = useAppStore();
  const { products, cartItems, orders, getProducts, addToCart, createOrder } =
    state;

  useEffect(() => {
    getProducts();
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }
  }, []);

  return (
    <div className="container">
      <button
        onClick={() => {
          localStorage.setItem("token", "");
          redirect("/login");
        }}
      >
        Logout
      </button>
      <h1 className="title">
        Product List <br />
      </h1>
      <div>
        <button disabled={cartItems.length < 1} onClick={createOrder}>
          Checkout: {cartItems.length} items
        </button>
        <button disabled={orders.length < 1}>
          Orders: {orders.length} orders
        </button>
      </div>
      <div style={{ display: "flex" }}>
        {products.map((product) => {
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
              <button onClick={() => addToCart(product._id)}>
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
