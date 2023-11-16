import { Modal, Paper } from "@mui/material";
import { FC } from "react";
import { InputBox } from "../inputs/input-box";
import { DenseInputLabel } from "../inputs/dense-input-label";
import { DenseTextField } from "../inputs/dense-text-field";
import { SubmissionButton } from "../buttons/submission-button";
import { EditOutlined } from "@mui/icons-material";
import {
  EditOrderForm,
  OrderStatus,
  orderStatusLabels,
} from "@/types/customer-purchases";
import { DenseSelectField } from "../inputs/dense-select-field";
import { DenseMenuItem } from "../inputs/dense-menu-item";

type EditOrderModalProps = {
  open: boolean;
  form: EditOrderForm;
  onUpdateForm: (form: EditOrderForm) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export const EditOrderModal: FC<EditOrderModalProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  onUpdateForm,
}) => {
  const { trackingId, status } = form;

  const setTrackingId = (trackingId: string) =>
    onUpdateForm({ ...form, trackingId });
  const setStatus = (status: OrderStatus) => onUpdateForm({ ...form, status });

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

          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          maxWidth: 600,
          padding: 3,
          gap: 1,
        }}
      >
        <InputBox>
          <DenseInputLabel htmlFor="order-tracking">
            Tracking Number
          </DenseInputLabel>
          <DenseTextField
            id="order-tracking"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
        </InputBox>
        <InputBox>
          <DenseInputLabel htmlFor="order-status">Status</DenseInputLabel>
          <DenseSelectField
            minRows={3}
            id="order-status"
            value={status ?? ""}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
          >
            {Object.entries(orderStatusLabels).map((entry) => (
              <DenseMenuItem key={entry[0]} value={entry[0]}>
                {entry[1]}
              </DenseMenuItem>
            ))}
          </DenseSelectField>
        </InputBox>

        <SubmissionButton
          startIcon={<EditOutlined />}
          sx={{ my: 1 }}
          onClick={onSubmit}
        >
          Save Changes
        </SubmissionButton>
      </Paper>
    </Modal>
  );
};
