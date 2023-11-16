import { useCookies } from "react-cookie";

export const useShoppingCart = () => {
  // TODO: add support for cookies, so that refreshing doesn't reset state
  const [cookies, setCookie] = useCookies(["shopping-cart"]);

  const items: string[] = cookies["shopping-cart"] ?? [];

  // used to trick nextjs into client-side rendering

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

  return { items, removeItem, addItem };
};
