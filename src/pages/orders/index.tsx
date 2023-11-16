import { Layout } from "@/components/layout/layout";
import { SmallText } from "@/components/typography/small-text";
import { trpc } from "@/trpc/client";
import { BasicOrder, EditOrderForm } from "@/types/customer-purchases";
import { Box, Container } from "@mui/material";
import { FC, useState } from "react";
import { SubmissionButton } from "@/components/buttons/submission-button";
import { EditOrderModal } from "@/components/modals/edit-order-modal";

const Orders: FC = () => {
  const utils = trpc.useUtils();
  const edit = trpc.orders.edit.useMutation();
  const { data: orders } = trpc.orders.list.useQuery();
  const [form, setForm] = useState<EditOrderForm | null>(null);

  const handleOrderUpdate = async () => {
    if (!form) return;

    const success = await edit.mutateAsync(form);
    if (!success) {
      alert("Failed to update order");
    } else {
      setForm(null);
      utils.orders.list.invalidate();
    }
  };

  return (
    <>
      <Layout
        title="Orders"
        description="View a list of your pending as a seller"
      >
        <Container>
          <Box display="flex" flexWrap={"wrap"} gap={1}>
            {orders?.map((order) => (
              <OrderCard
                {...order}
                key={order.id}
                onEdit={() => {
                  setForm(
                    orders?.find((target) => order.id === target.id) ?? null
                  );
                }}
              />
            ))}
          </Box>
        </Container>
      </Layout>
      <EditOrderModal
        open={form != null}
        form={
          form ?? {
            id: "",
            trackingId: "",
            status: "PENDING",
          }
        }
        onUpdateForm={(form) => setForm(form)}
        onClose={() => setForm(null)}
        onSubmit={handleOrderUpdate}
      />
    </>
  );
};

const OrderCard: FC<
  BasicOrder & {
    createdAt: string;
    products: string[];
    total: number;
    onEdit: () => void;
  }
> = ({
  id: orderId,
  createdAt,
  trackingId,
  status,
  products,
  total,
  onEdit,
}) => {
  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: "grey.100",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      <SmallText>
        <u>Order ID:</u> {orderId}
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
        {products.join("\n")}
      </SmallText>
      <SmallText>
        <u>Total:</u> ${total.toFixed(2)}
      </SmallText>
      <SubmissionButton onClick={() => onEdit()}>Edit Order</SubmissionButton>
    </Box>
  );
};

export default Orders;
