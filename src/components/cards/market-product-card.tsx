import { ProductObject } from "@/types/create-product-form";
import { FC } from "react";
import { ProductCard } from "./product-card";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { Box, Button, Link, Typography } from "@mui/material";

export const MarketProductCard: FC<{
  product: ProductObject;
  onClick: () => void;
}> = ({ product, onClick }) => {
  const cart = useShoppingCart();

  const filterProductQuantity = (product: ProductObject): number => {
    const quantity =
      cart.items?.filter((item) => item === product.id).length ?? 0;

    return Math.max(product.quantity - quantity, 0);
  };

  const quantity = filterProductQuantity(product);

  return (
    <ProductCard {...product} quantity={quantity} onClick={onClick}>
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="caption">
          Sold By:{" "}
          <Link href={`/seller/${product.seller.id}`}>
            {product.seller.email}
          </Link>
        </Typography>
        <Button
          onClick={onClick}
          size="small"
          disabled={quantity < 1}
          variant="contained"
          sx={{
            alignSelf: "flex-end",
          }}
        >
          {quantity > 0 ? "Add to cart" : "Out of stock"}
        </Button>
      </Box>
    </ProductCard>
  );
};
