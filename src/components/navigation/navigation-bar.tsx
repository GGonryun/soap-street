import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { FC } from "react";

export const NavigationBar: FC<{
  email?: string;
  items: number;
}> = ({ email, items }) => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Soap Street
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="flex-end">
          <NavButton color="inherit" href="/market">
            Market
          </NavButton>
          <NavButton color="inherit" href="/login">
            {email || "Login"}
          </NavButton>
          <NavButton
            color="error"
            size="small"
            variant="contained"
            endIcon={<ShoppingCart />}
            href="/cart"
          >
            My Cart {items}
          </NavButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  padding: theme.spacing(0.5, 1),
}));
