import { styled, Box } from "@mui/material";

export const InputBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(0.5),
}));
