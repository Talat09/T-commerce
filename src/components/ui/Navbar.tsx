import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
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
  const [cartOpen, setCartOpen] = useState(false); // State to manage cart drawer visibility
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

  // Function to toggle cart drawer
  const toggleCartDrawer = (open: boolean) => {
    setCartOpen(open);
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

  // Cart content
  const cartContent = (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onClick={() => toggleCartDrawer(false)}
      onKeyDown={() => toggleCartDrawer(false)}
    >
      <Typography variant="h6" sx={{ padding: 2 }}>
        Your Cart
      </Typography>
      <Typography variant="h6" sx={{ padding: 2 }}>
        TOTAL: $30
      </Typography>
      <List sx={{ padding: 0, width: "100%" }}>
        {/* You can map over cart items here */}
        <ListItem>
          {/* Product card */}
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Product image */}
            <CardMedia
              component="img"
              sx={{
                width: 80,
                height: 80,
                objectFit: "cover",
                marginRight: 2,
                borderRadius: "6px",
              }}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu91lqkHpDCEp3L5GsbCsgVzomm3fo_My89w&s" // Replace with the product image URL
              alt="Product 1"
            />

            {/* Product details */}
            <CardContent sx={{ padding: "0 16px" }}>
              <Typography variant="body1">Item 1</Typography>
              <Typography variant="body2" color="text.secondary">
                Price: $10
              </Typography>
              <Box sx={{ display: "flex", gap: 1, py: 1 }}>
                <IconButton
                  sx={{
                    bgcolor: "red",
                    color: "white",
                    width: "24px",
                    height: "24px",
                  }}
                  aria-label="decrease quantity"
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1">1</Typography>{" "}
                {/* Current quantity */}
                <IconButton
                  sx={{
                    bgcolor: "red",
                    color: "white",
                    width: "24px",
                    height: "24px",
                  }}
                  aria-label="increase quantity"
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </CardContent>
            {/* Quantity controls */}
            <CardActions
              sx={{
                padding: "0 16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <IconButton
                sx={{
                  bgcolor: "red",
                  color: "white",
                  width: "24px",
                  height: "24px",
                }}
                aria-label="remove item"
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </ListItem>
      </List>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
          borderTop: "1px solid #e0e0e0",

          backgroundColor: "white",
        }}
      >
        <Button
          sx={{
            bgcolor: "red",
            color: "white",
            width: "100%",
            borderRadius: "6px",
            padding: "12px 16px",
            fontWeight: 500,
            fontSize: "16px",
            textTransform: "uppercase",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
        >
          Checkout Cart
        </Button>
      </Box>
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
                <Button
                  color="inherit"
                  onClick={() => toggleCartDrawer(true)} // Open cart drawer on click
                >
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

            {/* Cart Drawer */}
            <Drawer
              anchor="right"
              open={cartOpen}
              onClose={() => toggleCartDrawer(false)} // Close on outside click
            >
              {cartContent}
            </Drawer>
          </Toolbar>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
