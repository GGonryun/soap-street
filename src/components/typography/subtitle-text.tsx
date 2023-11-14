import { styled, Typography } from "@mui/material";

export const SubtitleText = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  color: theme.palette.text.secondary,
}));
