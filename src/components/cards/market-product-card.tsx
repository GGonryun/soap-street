import { ProductObject } from "@/types/create-product-form";
import { FC } from "react";
import { ProductCard } from "./product-card";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { Box, Button, Link, Typography } from "@mui/material";
import { filterProductQuantity } from "@/util/product";

export const MarketProductCard: FC<{
  product: ProductObject;
  onClick: () => void;
}> = ({ product, onClick }) => {
  const cart = useShoppingCart();

  const quantity = filterProductQuantity(cart.items, product);

  return (
    <ProductCard
      {...product}
      quantity={quantity}
      href={`/product/${product.id}`}
    >
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
