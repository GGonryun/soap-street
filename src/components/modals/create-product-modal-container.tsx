import {
  CreateProductForm,
  EMPTY_CREATE_PRODUCT_FORM,
} from "@/types/create-product-form";
import { CreateProductModal } from "./create-product-modal";
import { FC, useEffect, useRef, useState } from "react";
import { PutBlobResult } from "@vercel/blob";
import { trpc } from "@/trpc/client";

type CreateProductModalContainerProps = {
  id?: string;
  open: boolean;
  onClose: () => void;
};

export const CreateProductModalContainer: FC<
  CreateProductModalContainerProps
> = ({ open, onClose, id }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const utils = trpc.useUtils();

  const createProduct = trpc.products.create.useMutation();
  const editProduct = trpc.products.edit.useMutation();
  const archiveProduct = trpc.products.archive.useMutation();

  const { data: product } = trpc.products.get.useQuery(
    {
      id: id ?? "",
    },
    {
      enabled: id != null,
    }
  );

  const [form, setForm] = useState<CreateProductForm>(
    EMPTY_CREATE_PRODUCT_FORM
  );

  useEffect(() => {
    setForm(product ?? EMPTY_CREATE_PRODUCT_FORM);
  }, [product]);

  const resetForm = () => {
    utils.products.list.invalidate();
    onClose();
    setForm(EMPTY_CREATE_PRODUCT_FORM);
  };

  const handleCreate = async () => {
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

    if (!response.ok) {
      const status = response.status;
      const text = await response.text();
      alert(`failed to upload file with status ${status} - ${text}`);
    }

    const blob: PutBlobResult = await response.json();

    const result = await createProduct.mutateAsync({
      ...form,
      imageUrl: blob.url,
    });

    if (result.ok) {
      resetForm();
    } else {
      alert(`failed to create product, check server logs`);
    }
  };

  const handleEdit = async () => {
    if (!id) throw new Error("Cannot edit without product id");

    // editing doesn't have an image upload
    const result = await editProduct.mutateAsync({
      id,
      ...form,
    });

    if (result.ok) {
      resetForm();
    } else {
      alert(`failed to edit product, check server logs`);
    }
  };

  const handleDelete = async () => {
    if (!id) throw new Error("Cannot delete without product id");

    const result = await archiveProduct.mutateAsync({
      id,
    });

    if (result.ok) {
      resetForm();
    } else {
      alert(`failed to delete product, check server logs`);
    }
  };

  return (
    <CreateProductModal
      editing={Boolean(id)}
      ref={inputFileRef}
      open={open}
      form={form}
      onUpdateForm={setForm}
      onClose={onClose}
      onDelete={handleDelete}
      onSubmit={!id ? handleCreate : handleEdit}
    />
  );
};
