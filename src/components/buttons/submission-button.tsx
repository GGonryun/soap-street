import { styled, ButtonProps, Button } from "@mui/material";
import { JSXElementConstructor } from "react";

export const SubmissionButton = styled<JSXElementConstructor<ButtonProps>>(
  (props) => (
    <Button
      fullWidth
      type="submit"
      variant="outlined"
      color="primary"
      {...props}
    />
  )
)(({ theme }) => ({
  fontSize: "0.7rem",
  padding: theme.spacing(0.25),
  textTransform: "none",
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
  },
}));
