import { createContext, FC, ReactNode, useContext, useState } from "react";

export type ShoppingItem = {
  id: string;
  quantity: number;
};

export type ShoppingCart = {
  items: ShoppingItem[];
  setItems: (items: ShoppingItem[]) => void;
};

export const DEFAULT_CART: ShoppingCart = {
  items: [],
  setItems: () => {},
};

export const ShoppingCartContext = createContext(DEFAULT_CART);

export const ShoppingCartProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  return (
    <ShoppingCartContext.Provider value={{ items, setItems }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const cart = useContext(ShoppingCartContext);
  return cart;
};
