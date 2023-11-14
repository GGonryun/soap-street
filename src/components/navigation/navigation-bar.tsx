import {
  AppBar,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Link,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { FC, JSXElementConstructor } from "react";

export const NavigationBar: FC<{
  email?: string;
  items: number;
}> = ({ email, items }) => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <NavTitle href="/" variant="h6" sx={{ flexGrow: 1 }}>
          Soap Street
        </NavTitle>
        <NavButtonGroup>
          <NavButton color="inherit" href="/market">
            Products
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
        </NavButtonGroup>
      </Toolbar>
    </AppBar>
  );
};

const NavButtonGroup = styled<JSXElementConstructor<BoxProps>>((props) => (
  <Box {...props} />
))(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  gap: theme.spacing(1),
}));

const NavTitle = styled(Link)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.common.white,
  textDecoration: "none",
}));

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  padding: theme.spacing(0.5, 1),
}));
