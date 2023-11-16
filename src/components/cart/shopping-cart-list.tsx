import { SimpleProductObject } from "@/types/create-product-form";
import { Cancel, Close, ShoppingCartCheckout } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Grid,
  GridProps,
  IconButton,
  Link,
  styled,
} from "@mui/material";
import { FC, Fragment, JSXElementConstructor } from "react";
import { ResponsiveImage } from "../images/responsive-image";

type ShoppingCartListProps = {
  products: SimpleProductObject[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
};
export const ShoppingCartList: FC<ShoppingCartListProps> = ({
  products,
  onCheckout,
  onRemove,
}) => {
  const total = products.reduce((acc, product) => acc + product.price, 0);
  return (
    <ProductList>
      <ProductListHeader />
      <Divider />
      {products.map((product, i) => (
        <Fragment key={i}>
          <ProductRow {...product} onRemove={() => onRemove(product.id)} />
          <Divider />
        </Fragment>
      ))}
      <ProductListFooter
        count={products.length}
        total={total}
        onCheckout={onCheckout}
      />
    </ProductList>
  );
};

const ProductList = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

const ProductListHeader = () => {
  return (
    <Grid container>
      <GridHeaderItem xs={2}></GridHeaderItem>
      <GridHeaderItem xs={5}>Item</GridHeaderItem>
      <GridHeaderItem xs={3}>Price</GridHeaderItem>
      <GridHeaderItem xs={2} justifyContent="flex-end">
        Remove
      </GridHeaderItem>
    </Grid>
  );
};

type ProductListFooterProps = {
  count: number;
  total: number;
  onCheckout: () => void;
};

const ProductListFooter: FC<ProductListFooterProps> = ({
  count,
  total,
  onCheckout,
}) => {
  return (
    <Grid container>
      <GridHeaderItem xs={7}>
        <Box>
          You have <b>{count}</b> items in your cart
        </Box>
      </GridHeaderItem>
      <GridItem xs={3} gap={0.5}>
        <b>${total.toFixed(2)}</b> total
      </GridItem>
      <GridItem xs={2} justifyContent="flex-end">
        <CheckoutButton disabled={total === 0} onClick={onCheckout}>
          Checkout
        </CheckoutButton>
      </GridItem>
    </Grid>
  );
};

const ProductRow: FC<SimpleProductObject & { onRemove: () => void }> = ({
  id,
  imageUrl,
  name,
  price,
  onRemove,
}) => {
  return (
    <Grid container display="flex" alignItems="center">
      <GridItem xs={2}>
        <Box width={50}>
          <ResponsiveImage src={imageUrl} alt={"Product Image"} />
        </Box>
      </GridItem>
      <GridItem xs={5}>
        <Link href={`/product/${id}`}>{name}</Link>
      </GridItem>
      <GridItem xs={3} gap={0.5}>
        <i>${price}</i> ea
      </GridItem>
      <GridItem xs={2} justifyContent="flex-end">
        <IconButton color="error" size="small" onClick={onRemove}>
          <Cancel fontSize="small" />
        </IconButton>
      </GridItem>
    </Grid>
  );
};

type StyledGrid = JSXElementConstructor<Omit<GridProps, "item">>;

const GridHeaderItem = styled<StyledGrid>((props) => <Grid item {...props} />)(
  ({ theme }) => ({
    display: "flex",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.grey[700],
    textTransform: "uppercase",
  })
);

const GridItem = styled<StyledGrid>((props) => <Grid item {...props} />)(
  ({ theme }) => ({
    display: "flex",
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(14),
  })
);

type StyledButton = JSXElementConstructor<
  Omit<ButtonProps, "variant" | "size" | "startIcon">
>;
const CheckoutButton = styled<StyledButton>((props) => (
  <Button
    variant="contained"
    size="small"
    startIcon={<ShoppingCartCheckout />}
    {...props}
  />
))(({ theme }) => ({
  textTransform: "none",
  fontSize: theme.typography.pxToRem(12),
  padding: theme.spacing(0.25, 1),
  margin: 0,
}));
