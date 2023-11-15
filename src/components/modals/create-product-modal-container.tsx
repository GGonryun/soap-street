import {
  CreateProductForm,
  EMPTY_CREATE_PRODUCT_FORM,
} from "@/types/create-product-form";
import { CreateProductModal } from "./create-product-modal";
import { FC, useRef, useState } from "react";
import { PutBlobResult } from "@vercel/blob";
import { trpc } from "@/trpc/client";

type CreateProductModalContainerProps = {
  open: boolean;
  onClose: () => void;
};

export const CreateProductModalContainer: FC<
  CreateProductModalContainerProps
> = ({ open, onClose }) => {
  const createProduct = trpc.products.create.useMutation();

  const [form, setForm] = useState<CreateProductForm>(
    EMPTY_CREATE_PRODUCT_FORM
  );

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSubmission = async () => {
    console.log("TODO: submit form");

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(
      `/api/product/image/upload?filename=${file.name}`,
      {
        method: "POST",
        body: file,
      }
    );

    if (response.ok) {
      const blob: PutBlobResult = await response.json();
      console.log("saved blob", blob);

      const result = await createProduct.mutateAsync({
        ...form,
        imageUrl: blob.url,
      });

      if (result.ok) {
        // if successful, close modal & clear form
        onClose();
        setForm(EMPTY_CREATE_PRODUCT_FORM);
        return;
      }
    }

    const status = response.status;
    const text = await response.text();
    alert(`failed to upload file with status ${status} - ${text}`);
  };
  return (
    <CreateProductModal
      ref={inputFileRef}
      open={open}
      form={form}
      onUpdateForm={setForm}
      onClose={onClose}
      onSubmit={handleSubmission}
    />
  );
};
