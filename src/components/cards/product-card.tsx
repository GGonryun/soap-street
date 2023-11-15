import { ProductObject } from "@/types/create-product-form";
import { Box, Link, Paper, Typography, styled } from "@mui/material";
import { FC } from "react";
import { ResponsiveImage } from "../images/responsive-image";

export const ProductCard: FC<
  ProductObject & {
    onClick: () => void;
    children: React.ReactNode;
  }
> = ({ children, onClick, name, description, price, quantity, imageUrl }) => {
  return (
    <Paper variant="outlined">
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          minHeight: 125,
          maxHeight: 250,
          overflow: "hidden",
        }}
      >
        <Box position="absolute">
          <ResponsiveImage src={imageUrl} alt={`${name} product image`} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap={1} p={1}>
        <ProductNameLink onClick={onClick}>{name}</ProductNameLink>
        <ProductDescription>{description}</ProductDescription>
        <Box display="flex" justifyContent="space-between">
          <ProductPrice>${price}</ProductPrice>
          <ProductPrice>{quantity} in stock</ProductPrice>
        </Box>
        {children}
      </Box>
    </Paper>
  );
};

const ProductNameLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(16),
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
    textDecorationColor: theme.palette.primary.main,
  },
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.secondary,
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightBold,
}));
