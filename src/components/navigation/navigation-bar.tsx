import {
  AppBar,
  Box,
  BoxProps,
  Button,
  Link,
  Toolbar,
  styled,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { FC, JSXElementConstructor } from "react";

export const NavigationBar: FC<{
  user?: { id: string; email: string; role: string };
  items: number;
}> = ({ user, items }) => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <NavTitle href="/" variant="h6" sx={{ flexGrow: 1 }}>
          Soap Street
        </NavTitle>
        <NavButtonGroup>
          {user?.role === "SELLER" && (
            <NavButton color="inherit" href="/products">
              Products
            </NavButton>
          )}
          {user && (
            <NavButton
              color="inherit"
              href={user?.role === "SELLER" ? "/orders" : "/purchases"}
            >
              {user?.role === "SELLER" ? "Orders" : "Purchases"}
            </NavButton>
          )}

          <NavButton color="inherit" href={user?.email ? "/account" : "/login"}>
            {user?.email || "Login"}
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
