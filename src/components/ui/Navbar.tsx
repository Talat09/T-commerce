import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";

import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { KeyboardEvent } from "react";
import { Link } from "react-router-dom";

import Cart from "../Cart/Cart";
import { useAppSelector } from "../../redux/hook/hook";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { products } = useAppSelector((state) => state.cart);
 // Calculate the total quantity of products in the cart
 const totalQuantity = products.reduce((acc, product) => acc + product.quantity!, 0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawerMouse = (open: boolean) => {
    setDrawerOpen(open);
  };

  const toggleDrawerKeyboard = (open: boolean) => (event: KeyboardEvent) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleCartDrawer = (open: boolean) => {
    setCartOpen(open);
  };

  const menuItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawerMouse(false)}
      onKeyDown={toggleDrawerKeyboard(false)}
    >
      <List>
        {["Service", "All Products"].map((text) => (
          <ListItem component={Link} to={`/${text.toLowerCase()}`} key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container>
        <Box position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                fontWeight: 600,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span style={{ color: "red" }}>T </span>- Commerce
            </Typography>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button component={Link} to="/service" color="inherit">
                  Service
                </Button>
                <Button component={Link} to="/all-products" color="inherit">
                  All Products
                </Button>
                <IconButton
                  color="inherit"
                  onClick={() => toggleCartDrawer(true)}
                >
                  <Badge badgeContent={totalQuantity} color="error">
                    <AddShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Box>
            )}

            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>

            {isMobile && (
              <>
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={() => toggleDrawerMouse(true)}
                >
                  <MenuIcon />
                </IconButton>

                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawerKeyboard(false)}
                >
                  {menuItems}
                  <Button
                    color="inherit"
                    sx={{
                      display: "flex",
                      justifyContent: "left",
                      p: 2,
                    }}
                    onClick={() => toggleCartDrawer(true)}
                  >
                    <Badge badgeContent={totalQuantity} color="error">
                      <AddShoppingCartIcon />
                    </Badge>
                  </Button>
                </Drawer>
              </>
            )}

            <Drawer
              anchor="right"
              open={cartOpen}
              onClose={() => toggleCartDrawer(false)}
            >
              <Cart toggleCartDrawer={toggleCartDrawer} />
            </Drawer>
          </Toolbar>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
