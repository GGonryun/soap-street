import { Select, styled } from "@mui/material";

export const DenseSelectField = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    fontSize: "0.7rem",
    padding: theme.spacing(0.5, 1),
  },
}));
