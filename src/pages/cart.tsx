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
import { useRouter } from "next/router";

export default function Cart() {
  const { push } = useRouter();
  const cart = useShoppingCart();
  const completeCheckout = trpc.cart.checkout.useMutation();

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

  const handleCheckout = async () => {
    const purchaseId = await completeCheckout.mutateAsync({
      productIds: cart.items,
    });

    cart.clear();

    push(`/checkout/${purchaseId}`);
  };

  return (
    <Layout title="Cart" description="Your shopping cart">
      <Container sx={{ pt: 3 }}>
        <Box display="flex" flexDirection="column" gap={2} pb={2}>
          <ShoppingText>
            Shopping Cart | <Link href="/">Keep shopping</Link>
          </ShoppingText>
          <ShoppingCartList
            products={merged() ?? []}
            onRemove={handleRemoveFromCart}
            onCheckout={handleCheckout}
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
