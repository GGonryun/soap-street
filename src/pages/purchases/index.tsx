import { Layout } from "@/components/layout/layout";
import { CaptionText } from "@/components/typography/caption-text";
import { trpc } from "@/trpc/client";
import { Box, Container, Link, Typography } from "@mui/material";
import { FC } from "react";

const Purchases: FC = () => {
  const { data: purchases } = trpc.purchases.list.useQuery();
  return (
    <Layout
      title="Purchases"
      description="View a list of your purchases as a user"
    >
      <Container>
        <Box display="flex" flexWrap={"wrap"} gap={1}>
          {purchases?.map((purchase, i) => (
            <PurchaseOrder key={purchase.id} index={i} {...purchase} />
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export default Purchases;

const PurchaseOrder: FC<{
  index: number;
  id: string;
  createdAt: string;
  status: string;
}> = ({ id, createdAt, status, index }) => {
  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: "grey.100",
        maxWidth: "300px",
      }}
    >
      <Link href={`/purchases/${id}`}>
        <Typography variant="h6">Purchase: #{index + 1}</Typography>
      </Link>
      <CaptionText variant="body1">Date: {createdAt}</CaptionText>
      <CaptionText variant="body1">Status: {status} </CaptionText>
    </Box>
  );
};
