import { Layout } from "@/components/layout/layout";
import { CaptionText } from "@/components/typography/caption-text";
import { trpc } from "@/trpc/client";
import { DetailedOrder } from "@/types/customer-purchases";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Container, Typography, styled } from "@mui/material";
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
      <Container>
        <Box>
          <Button startIcon={<ArrowBack />} onClick={handleBackButton}>
            Back
          </Button>
          <Typography>Purchase: {purchaseId}</Typography>
          <Typography>Created At: {purchase?.createdAt}</Typography>
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
> = ({
  id: orderId,
  createdAt,
  trackingId,
  status,
  productIds,
  products,
  seller,
}) => {
  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: "grey.100",
        width: "300px",
      }}
    >
      <SmallText>
        <u>Order:</u> {orderId}
      </SmallText>
      <SmallText>
        <u>Date:</u> {createdAt}
      </SmallText>
      <SmallText>
        <u>Status:</u> {status}{" "}
      </SmallText>
      <SmallText>
        <u>Tracking ID:</u> {trackingId}{" "}
      </SmallText>
      <SmallText>
        <u>Products:</u> {products.map((p) => `${p.name}`).join(", ")}
      </SmallText>
      <SmallText>
        <u>Seller:</u> {seller}{" "}
      </SmallText>
    </Box>
  );
};

const SmallText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.7rem",
}));

export default Purchase;
