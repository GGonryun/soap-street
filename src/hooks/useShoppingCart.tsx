import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type ShoppingCart = {
  items: string[]; // id of item
  setItems: Dispatch<SetStateAction<string[]>>;
};

export const DEFAULT_CART: ShoppingCart = {
  items: [],
  setItems: () => {},
};

export const ShoppingCartContext = createContext(DEFAULT_CART);

export const ShoppingCartProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  // TODO: add support for cookies, so that refreshing doesn't reset state
  const [items, setItems] = useState<string[]>([]);

  return (
    <ShoppingCartContext.Provider value={{ items, setItems }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
