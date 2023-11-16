import { styled, Typography } from "@mui/material";

export const SmallText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "0.8rem",
}));
