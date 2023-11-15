import { TextareaAutosize, styled } from "@mui/material";

export const DenseTextAreaField = styled(TextareaAutosize)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "0.7rem",
  fontWeight: 500,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[500]}`,
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
  "&:focus": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
  },
  "&:focus-visible": {
    outline: 0,
  },
  "::placeholder": {
    color: theme.palette.grey[400],
  },
}));
