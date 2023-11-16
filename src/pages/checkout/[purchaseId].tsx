import { RegistrationFooter } from "@/components/footer/registration-footer";
import { Layout } from "@/components/layout/layout";
import { CaptionText } from "@/components/typography/caption-text";
import { TitleText } from "@/components/typography/title-text";
import { Box, Container, Link, Typography, styled } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";

const Checkout: FC = () => {
  const { query } = useRouter();
  const purchaseId = query.purchaseId as string;

  return (
    <Layout
      title="Checkout Confirmation"
      description="Confirmation screen after checkout"
    >
      <CheckoutSuccessContainer>
        <CenteredBox>
          <TitleText>Order Received!</TitleText>
          <Typography variant="body2">
            Please allow 1 - ∞ business days for delivery.
          </Typography>
          <CaptionText>
            Note: it may take an additional ∞ business days to pack more
            sensitive bars of soap.
          </CaptionText>
        </CenteredBox>
        <Link href={`/purchases/${purchaseId}`}>
          Track the status of your order
        </Link>

        <CenteredBox>
          <CaptionText textTransform="uppercase" fontWeight={900}>
            Still Dirty?
          </CaptionText>
          <CaptionText>
            <Link href={`/`}>Keep shopping.</Link>
          </CaptionText>
        </CenteredBox>
      </CheckoutSuccessContainer>
      <br />
      <RegistrationFooter />
    </Layout>
  );
};

export default Checkout;

export const CheckoutSuccessContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  alignItems: "center",
  backgroundColor: theme.palette.grey[100],
}));

export const CenteredBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  alignItems: "center",
}));

export const OrderText = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
  fontWeight: 600,
  color: theme.palette.text.primary,
  textTransform: "uppercase",
}));
