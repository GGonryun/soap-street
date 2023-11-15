import { Box, Button, Container, Typography, styled } from "@mui/material";
import { Layout } from "@/components/layout/layout";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { CreateProductModalContainer } from "@/components/modals/create-product-modal-container";
import { trpc } from "@/trpc/client";
import { ProductCard } from "@/components/cards/product-card";
import { SubmissionButton } from "@/components/buttons/submission-button";

export default function Products() {
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const { data: products } = trpc.products.list.useQuery();

  const handleClose = () => {
    setShowModal(false);
    setEditId(undefined);
  };

  const handleEdit = (id: string) => {
    // set the edit id in the modal
    // open the modal
    setEditId(id);
    setShowModal(true);
  };

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
          <Box display="flex" gap={1} flexWrap={"wrap"} pt={1}>
            {products?.map((product) => (
              <Box key={product.id} flex={1} maxWidth={400} minWidth={200}>
                <ProductCard
                  {...product}
                  onClick={() => handleEdit(product.id)}
                >
                  <SubmissionButton onClick={() => handleEdit(product.id)}>
                    Edit
                  </SubmissionButton>
                </ProductCard>
              </Box>
            ))}
          </Box>
        </Container>
      </Layout>
      <CreateProductModalContainer
        id={editId}
        open={showModal}
        onClose={handleClose}
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
