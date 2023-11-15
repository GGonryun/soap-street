import { Box, Divider, Typography } from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { RegistrationFooter } from "@/components/footer/registration-footer";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { trpc } from "@/trpc/client";
import { MarketProductCard } from "@/components/cards/market-product-card";

export default function Home() {
  const cart = useShoppingCart();
  const handleAction = (id: string) => {
    // add to cart
    cart.addItem(id);
  };

  const { data: products } = trpc.products.market.useQuery();

  return (
    <Layout
      title="Soap Street"
      description="Bubbles, Barter, Bliss - Where soap dreams come true, and cleanliness is currency"
    >
      <Typography variant="body2" pt={2}>
        Bubbles, Barter, Bliss - Where soap dreams come true, and cleanliness is
        currency
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Box display="flex" gap={1} flexWrap={"wrap"} py={1}>
        {products?.map((product) => (
          <Box key={product.id} flex={1} maxWidth={400} minWidth={200}>
            <MarketProductCard
              product={product}
              onClick={() => handleAction(product.id)}
            />
          </Box>
        ))}
      </Box>
      <RegistrationFooter />
    </Layout>
  );
}
