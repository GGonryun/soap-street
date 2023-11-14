import { styled, TextField } from "@mui/material";

export const DenseTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    fontSize: "0.7rem",
  },
  "& .MuiInputBase-input": {
    fontSize: "0.7rem",
    padding: theme.spacing(0.5, 1),
  },
}));
