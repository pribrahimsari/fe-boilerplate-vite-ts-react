import { createContext, useCallback, useContext, useState } from "react";
import { Product } from "src/types/ProductTypes.ts";

export type TCartContext = {
  cart: Product[];
  addProductToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
};

const CartContext = createContext<TCartContext | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addProductToCart = useCallback(
    (product: Product) => {
      const index = cart.findIndex((item) => item.id === product.id);
      if (index < 0) setCart((products) => [product, ...products]);
    },
    [cart]
  );

  const removeFromCart = useCallback((id: number) => {
    setCart((products) => [...products.filter((product) => product.id !== id)]);
  }, []);

  const isInCart = useCallback(
    (id: number) => {
      return cart.findIndex((product) => product.id === id) >= 0;
    },
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, addProductToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) throw new Error("Error msg");

  return context;
};
