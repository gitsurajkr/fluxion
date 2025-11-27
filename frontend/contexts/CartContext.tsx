"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { cartAPI } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cartCount: number;
  refreshCart: () => Promise<void>;
  addToCart: (templateId: string, quantity?: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      setCartCount(0);
    }
  }, [isAuthenticated]);

  const refreshCart = async () => {
    try {
      const response = await cartAPI.getCart();
      if (response.summary) {
        setCartCount(response.summary.itemCount);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartCount(0);
    }
  };

  const addToCart = async (templateId: string, quantity: number = 1) => {
    await cartAPI.addToCart({ tempelateId: templateId, quantity });
    await refreshCart();
  };

  const value = {
    cartCount,
    refreshCart,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
