import { Layout } from "@/components/layout/layout";
import { CaptionText } from "@/components/typography/caption-text";
import { trpc } from "@/trpc/client";
import { DetailedOrder } from "@/types/customer-purchases";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";

const Purchase: FC = () => {
  const { query, back } = useRouter();
  const purchaseId = query.purchaseId as string;

  const { data: purchase } = trpc.purchases.get.useQuery({
    id: purchaseId,
  });

  const handleBackButton = () => {
    back();
  };

  return (
    <Layout
      title="Purchase"
      description="View details about a specific purchase"
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Button startIcon={<ArrowBack />} onClick={handleBackButton}>
          Back
        </Button>
        <Box>
          <Typography variant="body2">
            <b>Purchase ID:</b> {purchaseId}
          </Typography>
          <Typography variant="body2">
            <b>Created At:</b> {purchase?.createdAt}
          </Typography>
        </Box>
        <Box display="flex" flexWrap={"wrap"} gap={1}>
          {purchase?.orders.map((order) => (
            <OrderCard {...order} key={order.id} />
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

const OrderCard: FC<
  Omit<DetailedOrder, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  }
> = ({ id: orderId, createdAt, trackingId, status, products, seller }) => {
  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: "grey.100",
        width: "300px",
      }}
    >
      <SmallText>
        <u>Order ID:</u> {orderId}
      </SmallText>
      <SmallText>
        <u>Seller:</u> <Link href={`/seller/${seller.id}`}>{seller.email}</Link>
      </SmallText>
      <SmallText>
        <u>Date:</u> {createdAt}
      </SmallText>
      <SmallText>
        <u>Status:</u> {status}
      </SmallText>
      <SmallText>
        <u>Tracking ID:</u> {trackingId}
      </SmallText>
      <SmallText whiteSpace="pre">
        <u>Products:</u> <br />
        {products
          .map((p) => `${p.name} x ${p.quantity} @ ${p.price}`)
          .join("\n")}
      </SmallText>
      <SmallText>
        <u>Total:</u> $
        {products.reduce((acc, p) => acc + p.price * p.quantity, 0)}
      </SmallText>
    </Box>
  );
};

const SmallText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.7rem",
}));

export default Purchase;
