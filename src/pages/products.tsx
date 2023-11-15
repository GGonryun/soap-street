import { Box, Button, Container, Typography, styled } from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { CreateProductModalContainer } from "@/components/modals/create-product-modal-container";

export default function Products() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Layout title="Products" description="Make an account!">
        <Container sx={{ pt: 3 }}>
          <Box display="flex" justifyContent="space-between">
            <SectionText>Your Products</SectionText>
            <Button
              variant="contained"
              startIcon={<Add />}
              size="small"
              onClick={() => setShowModal(true)}
            >
              Create New
            </Button>
          </Box>
        </Container>
      </Layout>
      <CreateProductModalContainer
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

const SectionText = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.pxToRem(18),
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
}));
