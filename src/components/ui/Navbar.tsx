import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Function to toggle the drawer for mouse events
  const toggleDrawerMouse = (open: boolean) => {
    setDrawerOpen(open);
  };

  // Function to toggle the drawer for keyboard events
  const toggleDrawerKeyboard = (open: boolean) => (event: KeyboardEvent) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Menu items for mobile
  const menuItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawerMouse(false)}
      onKeyDown={toggleDrawerKeyboard(false)}
    >
      <List>
        {["Service", "All Products", "Cart"].map((text) => (
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
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Added box shadow
        backgroundColor: "white", // Ensures background for shadow visibility
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container>
        <Box position="static">
          <Toolbar>
            {/* Left: Logo */}
            <Typography
              variant="h6"
              component={Link} // Make the logo a link
              to="/" // Link to home page
              sx={{
                flexGrow: 1,
                fontWeight: 600,
                textDecoration: "none",
                color: "inherit",
              }} // Ensure it inherits color and remove underline
            >
              <span style={{ color: "red" }}>T </span>- Commerce
            </Typography>

            {/* Center: Links (Hide on mobile) */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button component={Link} to="/service" color="inherit">
                  Service
                </Button>
                <Button component={Link} to="/all-products" color="inherit">
                  All Products
                </Button>
                <Button component={Link} to="/cart" color="inherit">
                  <AddShoppingCartIcon />
                </Button>
              </Box>
            )}

            {/* Right: Login Button with Link */}
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>

            {/* Mobile Menu Icon and Drawer */}
            {isMobile && (
              <>
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={() => toggleDrawerMouse(true)}
                >
                  <MenuIcon />
                </IconButton>

                {/* Drawer for mobile navigation */}
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawerKeyboard(false)}
                >
                  {menuItems}
                </Drawer>
              </>
            )}
          </Toolbar>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
