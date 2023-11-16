import { Modal, Paper } from "@mui/material";
import { forwardRef } from "react";
import { InputBox } from "../inputs/input-box";
import { DenseInputLabel } from "../inputs/dense-input-label";
import { DenseTextField } from "../inputs/dense-text-field";
import { DenseTextAreaField } from "../inputs/dense-text-area-field";
import { SubmissionButton } from "../buttons/submission-button";
import { Add, DeleteOutline, EditOutlined } from "@mui/icons-material";
import { CreateProductForm } from "@/types/create-product-form";

type CreateProductModalProps = {
  open: boolean;
  form: CreateProductForm;
  editing: boolean;
  onUpdateForm: (form: CreateProductForm) => void;
  onClose: () => void;
  onSubmit: () => void;
  onDelete: () => void;
};

export const CreateProductModal = forwardRef<
  HTMLInputElement,
  CreateProductModalProps
>(({ open, onClose, onSubmit, form, onUpdateForm, editing, onDelete }, ref) => {
  const { name, description, price, quantity } = form;

  const setName = (name: string) => onUpdateForm({ ...form, name });
  const setDescription = (description: string) =>
    onUpdateForm({ ...form, description });
  const setPrice = (price: number) => onUpdateForm({ ...form, price });
  const setQuantity = (quantity: number) => onUpdateForm({ ...form, quantity });

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: "blur(3px)",
          backgroundColor: "transparent",
        },
      }}
    >
      <Paper
        elevation={5}
        sx={{
          border: (theme) => `1px solid ${theme.palette.grey[400]}`,
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "scroll",
          minWidth: 300,
          maxWidth: 600,
          padding: 3,
          gap: 1,
        }}
      >
        <InputBox>
          <DenseInputLabel required htmlFor="product-name">
            Name
          </DenseInputLabel>
          <DenseTextField
            placeholder="My Awesome Product"
            id="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <DenseInputLabel htmlFor="product-description">
            Description
          </DenseInputLabel>
          <DenseTextAreaField
            minRows={3}
            placeholder="This is an awesome product"
            id="product-description"
            value={description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <DenseInputLabel required htmlFor="product-quantity">
            Quantity
          </DenseInputLabel>
          <DenseTextField
            type="number"
            id="product-quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value || "0"))}
          />
        </InputBox>
        <InputBox>
          <DenseInputLabel required htmlFor="product-price">
            Price
          </DenseInputLabel>
          <DenseTextField
            inputProps={{
              step: "0.1",
            }}
            type="number"
            id="product-price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value || "0"))}
          />
        </InputBox>
        {!editing && (
          <InputBox>
            <DenseInputLabel required htmlFor="product-image">
              Image
            </DenseInputLabel>
            <input
              ref={ref}
              accept="image/*"
              id="product-image"
              multiple={false}
              type="file"
            />
          </InputBox>
        )}
        <SubmissionButton
          startIcon={editing ? <EditOutlined /> : <Add />}
          sx={{ my: 1 }}
          onClick={onSubmit}
        >
          {editing ? "Edit Product" : "Create Product"}
        </SubmissionButton>
        <SubmissionButton
          startIcon={<DeleteOutline />}
          color="error"
          onClick={onDelete}
        >
          Delete Product
        </SubmissionButton>
      </Paper>
    </Modal>
  );
});

CreateProductModal.displayName = "CreateProductModal";
