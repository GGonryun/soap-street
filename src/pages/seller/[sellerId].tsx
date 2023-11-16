import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  styled,
} from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { useRouter } from "next/router";
import { trpc } from "@/trpc/client";
import { ArrowBack } from "@mui/icons-material";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { MarketProductCard } from "@/components/cards/market-product-card";

export default function Product() {
  const { query, push } = useRouter();
  const cart = useShoppingCart();

  const { data: seller, isLoading } = trpc.sellers.get.useQuery({
    id: query.sellerId as string,
  });

  const handleBack = () => {
    push("/");
  };

  const handleAction = (id: string) => {
    // add to cart
    cart.addItem(id);
  };

  return (
    <Layout title="Product Page" description="View details about a product">
      <SellerContainer>
        {!seller ? (
          <CircularProgress />
        ) : (
          <>
            <Button onClick={handleBack} startIcon={<ArrowBack />}>
              Browse Marketplace
            </Button>
            <Typography variant="h5">
              <b>{seller.details.email}</b>&apos;s store
            </Typography>
            <Typography variant="h6">My Products:</Typography>
            <ProductsBox>
              {seller.products.map((product) => (
                <ProductBox key={product.id}>
                  <MarketProductCard
                    product={{ ...product, seller: seller.details }}
                    onClick={() => handleAction(product.id)}
                  />
                </ProductBox>
              ))}
            </ProductsBox>
          </>
        )}
      </SellerContainer>
    </Layout>
  );
}

const SellerContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing(3),
}));

const ProductsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(4),
  flexWrap: "wrap",
}));

const ProductBox = styled(Box)({
  flex: 1,
  maxWidth: 400,
  minWidth: 200,
});
