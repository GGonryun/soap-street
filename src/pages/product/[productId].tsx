import { Box, Button, Container, Typography } from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { useRouter } from "next/router";
import { trpc } from "@/trpc/client";
import { ResponsiveImage } from "@/components/images/responsive-image";
import { ArrowBack, ShoppingCart } from "@mui/icons-material";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { filterProductQuantity } from "@/util/product";
import { ProductObject } from "@/types/create-product-form";

export default function Product() {
  const { query, back } = useRouter();
  const cart = useShoppingCart();

  const product = trpc.products.get.useQuery({
    id: query.productId as string,
  });

  if (product.isLoading) {
    return <Box>Loading...</Box>;
  }

  if (!product.data) {
    return <Box>That product does not exist</Box>;
  }

  const quantity = filterProductQuantity(
    cart.items,
    product.data as ProductObject
  );

  const handleAddToCart = () => {
    if (!product.data) return;

    cart.addItem(product.data.id);
  };

  const handleBack = () => {
    back();
  };

  return (
    <Layout title="Product Page" description="View details about a product">
      <Container
        sx={{
          pt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 3,
        }}
      >
        <Button onClick={handleBack} startIcon={<ArrowBack />}>
          Back
        </Button>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          width="100%"
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="h5">{product.data.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {product.data?.description}
            </Typography>
            <Typography variant="body1" color="text.primary">
              ${product.data.price}
            </Typography>
            <Typography variant="body1" color="text.primary">
              {quantity} in stock
            </Typography>
            <Button
              onClick={handleAddToCart}
              variant="contained"
              disabled={quantity < 1}
              startIcon={<ShoppingCart />}
            >
              {quantity > 0 ? "Add to cart" : "Out of stock"}
            </Button>
          </Box>
          <Box maxWidth={200}>
            <ResponsiveImage src={product.data.imageUrl} alt="Product Image" />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
