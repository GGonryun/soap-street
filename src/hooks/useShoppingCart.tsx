import { useCookies } from "react-cookie";

export const useShoppingCart = () => {
  const [cookies, setCookie] = useCookies(["shopping-cart"]);

  const items: string[] = cookies["shopping-cart"] ?? [];

  const addItem = (item: string) => {
    const items = cookies["shopping-cart"] ?? [];

    setCookie("shopping-cart", [...items, item], {
      path: "/",
    });
  };

  const removeItem = (item: string) => {
    const items: string[] = cookies["shopping-cart"] ?? [];
    const index = items.indexOf(item);
    if (index > -1) {
      items.splice(index, 1);
    }

    setCookie("shopping-cart", items);
  };

  const clear = () => {
    setCookie("shopping-cart", []);
  };

  return { items, removeItem, addItem, clear };
};
