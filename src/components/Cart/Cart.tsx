// Cart.tsx
import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../redux/hook/hook";
import {
  addToCart,
  removeFromCart,
  removeOneFromCart,
} from "../../redux/features/cart/cartSlice";

interface CartProps {
  toggleCartDrawer: (open: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ toggleCartDrawer }) => {
  const { products } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  // Calculate the total price of products in the cart
  const totalPrice = products
    .reduce((acc, product) => acc + product.price! * product.quantity!, 0)
    .toFixed(2);
  return (
    <Box
      sx={{
        width: {
          xs: 250, // For small screens (xs = extra small)
          sm: 300, // For small screens
          md: 400, // For medium and larger screens
        },
      }}
      role="presentation"
      onClick={() => toggleCartDrawer(true)}
      onKeyDown={() => toggleCartDrawer(false)}
    >
      <Typography variant="h6" sx={{ padding: 2 }}>
        Your Cart
      </Typography>

      <Typography variant="h6" sx={{ padding: 2 }}>
        TOTAL: ${totalPrice}
      </Typography>

      <Grid container>
        <Grid item xs={12} md={12} sx={{ padding: 1, width: "100%" }}>
          {products.map((item, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                mb: 2,
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  marginRight: 2,
                  borderRadius: "6px",
                }}
                image={item.image}
                alt={item.name}
              />
              <CardContent sx={{ padding: "0 16px" }}>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {item.quantity!}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${(item.price * item.quantity!).toFixed(2)}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, py: 1 }}>
                  <IconButton
                    onClick={() => dispatch(removeOneFromCart(item))}
                    sx={{
                      bgcolor: "red",
                      color: "white",
                      width: "24px",
                      height: "24px",
                      ":hover": {
                        bgcolor: "red",
                        color: "white",
                      },
                    }}
                    aria-label="decrease quantity"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1">{item.quantity!}</Typography>
                  <IconButton
                    onClick={() => dispatch(addToCart(item))}
                    sx={{
                      bgcolor: "black",
                      color: "white",
                      width: "24px",
                      height: "24px",
                      ":hover": {
                        bgcolor: "black",
                        color: "white",
                      },
                    }}
                    aria-label="increase quantity"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </CardContent>
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
                  onClick={() => dispatch(removeFromCart(item))}
                  sx={{
                    bgcolor: "red",
                    color: "white",
                    width: "24px",
                    height: "24px",
                    ":hover": {
                      bgcolor: "red",
                      color: "white",
                    },
                  }}
                  aria-label="remove item"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>

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
};

export default Cart;
