import { create } from "zustand";
import axios from "axios";

export const useAppStore = create((set) => ({
  products: [],
  cartItems: [],
  orders: [],

  getProducts: async () => {
    const URL = `http://localhost:${
      process.env.PORT_AUTH || 8002
    }/product/list`;
    const res = await axios.get(URL);
    set((state) => ({ products: res.data }));
  },

  addToCart: (_productId) =>
    set((state) => ({ cartItems: [...state.cartItems, _productId] })),
  createOrder: async (state) => {
    const URL = `http://localhost:${process.env.PORT_AUTH || 8002}/product/buy`;
    const res = await axios.post(
      URL,
      { ids: state.cartItems },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    set((state) => ({ orders: [...state.orders, res.data.newOrder] }));
  },
}));
