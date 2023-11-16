import {
  Box,
  Container,
  Divider,
  Link,
  Typography,
  styled,
} from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { RegistrationFooter } from "@/components/footer/registration-footer";
import { ShoppingCartList } from "@/components/cart/shopping-cart-list";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { trpc } from "@/trpc/client";
import { SimpleProductObject } from "@/types/create-product-form";
import { useEffect, useState } from "react";

export default function Cart() {
  const cart = useShoppingCart();

  // this caches the items locally so that we don't make a request every time the cart changes
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(cart.items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uniqueProducts = items.filter(
    (v, i, a) => a.findIndex((t) => t === v) === i
  );

  const { data: products } = trpc.cart.get.useQuery(
    {
      productIds: uniqueProducts,
    },
    {
      enabled: !!items.length,
    }
  );

  const merged = (): SimpleProductObject[] => {
    if (!products) return [];
    return cart.items
      .sort()
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean) as SimpleProductObject[];
  };

  const handleRemoveFromCart = (id: string) => {
    cart.removeItem(id);
  };

  return (
    <Layout title="Login" description="Log in and make purchases">
      <Container sx={{ pt: 3 }}>
        <Box display="flex" flexDirection="column" gap={2} pb={2}>
          <ShoppingText>
            Shopping Cart | <Link href="/">Keep shopping</Link>
          </ShoppingText>
          <ShoppingCartList
            products={merged() ?? []}
            onCheckout={() => alert("TODO: handle checkout")}
            onRemove={handleRemoveFromCart}
          />
        </Box>
        <Divider />
        <RegistrationFooter />
      </Container>
    </Layout>
  );
}
const ShoppingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  textTransform: "uppercase",
  fontWeight: "bold",
}));
