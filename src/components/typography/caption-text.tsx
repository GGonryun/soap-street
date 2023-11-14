import { styled, Typography } from "@mui/material";

export const CaptionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.7rem",
}));
